
let _ = require('lodash')
let Crypto = require('crypto')
let Identicon = require('identicon.js');
let Parse = require('parse/node')
let { wxpay } = require('3rd-party-pay')
let moment = require('moment')
let { resumePrivates, resumePublics } = require('../summary')

let ParseServer = require('parse-server')
const ShapeClass = Parse.Object.extend('shape')
const WorksClass = Parse.Object.extend('works')
const LikeClass = Parse.Object.extend('like')
const CommentClass = Parse.Object.extend('comment')
const ShapeCategoryClass = Parse.Object.extend('organization')
const ShareClass = Parse.Object.extend('share')
const HistoryClass = Parse.Object.extend('history')
const PaymentOffClass = Parse.Object.extend('paymentOff')
const OrderClass = Parse.Object.extend('order')
const { wepay, alipay } = require('../../factory')
const { ALIPAY_TIMEOUT, ALIPAY_NOTIFY_URL, WEPAY_NOTIFY_URL, ALIPAY_RETURN_URL, APP_NAME } = process.env



const planes = {
  planeA: {
    price: 0,
    label: '免费版'
  },
  planeB: {
    price: 99,
    label: '入门版'
  },
  planeC: {
    price: 199,
    label: '专业版'
  }
}

/**
 * 是否是升级订单
 * @param {*} user 
 * @param {*} buyPlane 
 */
function isUpgradeBuy(oldPlane, buyPlane) {
  if (oldPlane && buyPlane) {
    return oldPlane.price < buyPlane.price
  }

  return false
}

/**
 * 是否降级购买
 */
function isDowngradeBuy(oldPlane, buyPlane) {
  if (oldPlane && buyPlane) {
    return oldPlane.price >= buyPlane.price
  }

  return false
}


/**
 * 获取当前计划的订单
 * @param {*} user 
 */
async function getCurrentPlaneOrder(user) {
  var older = await new Parse.Query(OrderClass).equalTo('user', user).equalTo('status', 'success').descending('updatedAt').first({ useMasterKey: true })
  return older
}

/**
 * 获取订单已使用的费用
 * @param {*} order 
 */
function getPlaneUseFee(order) {
  var fee = 0
  var now = moment()

  if (!_.isEmpty(order)) {
    var orderYears = _.toNumber(order.get('payYears'))
    var orderDate = moment(order.get('createdAt'))
    var expiredDate = orderDate.clone().add(orderYears, 'years')
    //var useDays = moment.duration(now - orderDate).as('days')
    var remainDays = _.toInteger(moment.duration(expiredDate - now).as('days'))

    if (expiredDate > now && remainDays > 0) {
      var allDays = moment.duration(expiredDate - orderDate).as('days')
      var priceOfDay = _.toNumber(_.toNumber(order.get('price') / allDays)).toFixed(2)


      fee = _.toNumber((_.toNumber(priceOfDay) * remainDays).toFixed(2))
    }
  }

  return fee
}

/**
 * 根据 request 创建订单对象
 * @param {ParseRequest} req 
 * @returns  {Object} = {payUse,payYears,total,name: '蓝图巴巴服务费',summary,number} 
 */
async function buildOrder(req) {
  var { payPlane, payYears, payUse = 'ALIPAY' } = req.params
  var plane = planes[payPlane]
  var price = 0
  var number = `F${new Date().getTime()}`
  var user = req.user
  var name = ''
  var oldPlane = null

  if (!_.isNumber(payYears) || payYears < 0) {
    throw new Error('请选择要购买时长')
  }

  if (_.isEmpty(plane)) {
    throw new Error('请选择要购买的功能')
  }

  if (_.isEmpty(user)) {
    throw new Error('请登录')
  }

  if (user.get('plane') === payPlane) {
    throw new Error('已购买')
  }

  payYears = _.toInteger(payYears)
  oldPlane = planes[user.get('plane')]
  name = plane.label
  price = _.toNumber(_.toNumber(plane.price * payYears).toFixed(2))

  if (isDowngradeBuy(oldPlane, plane)) {
    throw new Error('不能购买相同版本或降级购买')
  }

  var paymentOff = await new Parse.Query(PaymentOffClass).equalTo('year', payYears).first()
  if (paymentOff) {
    var offPoint = await paymentOff.get('offPoint') || 1
    price = _.toNumber(_.toNumber(price * offPoint).toFixed(2))
  }

  var isUpgrade = isUpgradeBuy(oldPlane, plane)
  if (isUpgrade) {
    var older = await getCurrentPlaneOrder(user)
    var upgradeFee = getPlaneUseFee(older)

    if (older.payYears < payYears) {
      throw new Error(`版本升级，购买时长不能小于老版本的时长 (${older.payYears}) 年`)
    }

    price = _.toNumber(_.toNumber(price - upgradeFee).toFixed(2))
    name = `${oldPlane.label}升级到${plane.label}`
  }


  if (!_.isNumber(price) || price <= 0) {
    throw new Error(400, '折扣错误')
  }


  return {
    payUse,
    payYears,
    price,
    name: `${APP_NAME}-${name}`,
    payPlane,
    number,
    user: req.user,
  }
}

async function saveOrder(order, user) {
  var acl = new Parse.ACL()
  acl.setPublicWriteAccess(false)
  acl.setPublicReadAccess(false)
  acl.setReadAccess(user.id, true)

  var model = new OrderClass()
  model.setACL(acl)

  await model.save(order)
}

const assumeRole = async () => {
  //let currentUser = Parse.User.current()
  // let currentUser = { id: 'testUser' }


  /*
  if (_.isEmpty(currentUser)) {
    return {
      error: '请登录'
    }
  }*/
  /*
    const policy = {
      "Statement": [
        {
          "Action": "oss:*",
          "Effect": "Allow",
          "Resource": `acs: oss: picture/ ${currentUser}.id/*`
        }
      ],
      "Version": "1"
    }*/

  // try {
  //   let token = await ossSts.assumeRole(
  //     'acs:ram::1263937447579105:role/aliyunossrole', null, 60 * 15, 'WebRole');

  //   return token.credentials
  // } catch (e) {
  //   throw e
  // }
}

const shapesWithCategory = async (req) => {
  var categoryQuery = new Parse.Query(ShapeCategoryClass)
  var { index = 1, size = 20, itemSize = 20, map, category, keyword } = req.params
  if (index <= 0) {
    index = 1
  }

  if (size >= 100 || size <= 0) {
    size = 20
  }

  if (itemSize >= 100 || itemSize <= 0) {
    itemSize = 20
  }

  if (map) {
    categoryQuery = categoryQuery.contains('map', map)
  }

  if (category) {
    categoryQuery = categoryQuery.equalTo('category', category)
  }

  if (keyword) {
    categoryQuery = Parse.Query.and(categoryQuery, Parse.Query.or(new Parse.Query(ShapeCategoryClass).contains('keywords', keyword), new Parse.Query(ShapeCategoryClass).contains('name', keyword)))
  }

  var categories = await categoryQuery
    .doesNotExist('isDisable')
    .withCount(true)
    .skip((index - 1) * size)
    .limit(size)
    .find()

  var promises = _.map(categories.results, (item) => {
    let category = item

    return new Promise(async (resolve) => {
      var shapeQuery = new Parse.Query(ShapeClass)
      var shapes = await shapeQuery.equalTo("organization", category).ascending('order').limit(itemSize).find()
      category.set('shapes', _.map(shapes, (shape) => {
        return _.pick(shape.toJSON(), "objectId", "name", "order", "model", "category", "xml", "allowCreate", "allowDelete")
      }))

      resolve(category.toJSON())
    })
  })


  categories.results = await Promise.all(promises)

  return categories
}

const shapesForCategory = async (req) => {
  var shapeQuery = new Parse.Query(ShapeClass)
  var { index = 0, size = 10, category = null } = req.params

  if (!category) {
    return []
  }

  var shapes = await shapeQuery.equalTo("organization", {
    "className": "organization",
    "objectId": category
  }).ascending('order').skip(index * size).limit(size).find()

  var result = _.map(shapes, (shape) => {
    return _.pick(shape.toJSON(), "objectId", "name", "order", "model", "ports", "category", "xml", "allowCreate", "allowDelete")
  })

  return result
}

const makeAvatar = async (req) => {
  let seed = req.user.id + new Date().getTime()
  let md5 = Crypto.createHash('md5').update(seed).digest("hex")
  let result = new Identicon(md5, { size: 150, format: 'svg' }).toString()

  return result
}

const shareFile = async (req) => {
  const { id, password } = req.params
  let shareModel = await new Parse.Query(ShareClass).equalTo('link', id).first()
  if (shareModel) {
    if (shareModel.get('shareWithLink')) {
      let pass = shareModel.get('password')
      if (_.isEmpty(pass) || !_.isEmpty(pass) && pass === password) {
        let sourceModel = await new Parse.Query(WorksClass).get(shareModel.get('source'))
        if (sourceModel) {
          return sourceModel
        } else {
          throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND)
        }
      } else {
        if (_.isEmpty(password)) {
          throw new Parse.Error(Parse.Error.VALIDATION_ERROR)
        } else {
          throw new Parse.Error(Parse.Error.INVALID_SESSION_TOKEN)
        }
      }
    }
  }

  throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND)

}

const getCategoryList = async () => {
  return await new Parse.Query(ShapeClass).distinct('category')
}


const openWorks = async (req) => {
  const { id } = req.params
  let works = await new Parse.Query(WorksClass).get(id, { useMasterKey: true })
  let history = await new Parse.Query(HistoryClass).equalTo('works', works).descending('targetUpdateTime').first({ useMasterKey: true })

  if (!_.isEmpty(works.get('raw'))) {
    if (_.isEmpty(history) || history.get('targetUpdateTime').getTime() !== works.get('updatedAt').getTime()) {
      // create new version
      let model = new HistoryClass()
      let acl = new Parse.ACL()
      acl.setPublicWriteAccess(false)
      acl.setPublicReadAccess(false)
      acl.setReadAccess(req.user.id, true)

      model.set('raw', works.get('raw'))
      model.set('targetUpdateTime', works.get('updatedAt'))
      model.set('works', works)
      model.setACL(acl)
      // model.save({
      //   useMasterKey: true
      // })

      await model.save(null, {
        useMasterKey: true
      })

      // remove old versions if all great than 20 count
      new Parse.Query(HistoryClass).equalTo(works).descending('targetUpdateTime').skip(20).each(async (item) => {
        await item.destroy({
          useMasterKey: true
        })
      }, { useMasterKey: true })
    }
  }
}

// const oauth = async (req) => {
//   const { appName } = req.params
// }

const changePassword = async (req) => {
  // var user = await new Parse.Query(UserClass).equalTo('password', '$2b$10$yKWOyLlUM9NKWZK6p783s.mOfj4GMpZ6DY3bCZPpAZhw/wHq3GZmW').find()
  const { password } = req.params
  req.user.set('password', password, {

    useMasterKey: true
  })
  return req.user.save({
    useMasterKey: true
  })
}

const planeFee = async (req) => {
  var user = req.user
  var fee = 0
  var order = await getCurrentPlaneOrder(user)
  var payYears = 0
  if (order) {
    fee = getPlaneUseFee(order)
    payYears = order.get('payYears')
  }

  return {
    fee,
    payYears
  }
}

/**
 * 购买功能
 */
const buy = async (req) => {
  var url = null
  var order = null
  if (!req.user) {
    return Promise.reject(new Parse.Error(Parse.Error.SESSION_MISSING, '请登录'))
  }

  try {
    order = await buildOrder(req)
    await saveOrder(order, req.user)
  } catch (error) {
    return Promise.reject(new Parse.Error(400, error.message))
  }

  if (order) {
    switch (order.payUse) {
      case 'ALIPAY':
        url = alipay.pagePay(
          {
            out_trade_no: order.number,
            subject: order.name,
            total_amount: order.price,
            timeout_express: ALIPAY_TIMEOUT
          },
          {
            return_url: ALIPAY_RETURN_URL,
            notify_url: ALIPAY_NOTIFY_URL
          }
        );

        return {
          number: order.number,
          url,
        }

      case 'WEPAY':
        await wepay.unifiedOrder({
          body: "支付服务费",
          out_trade_no: order.number,
          total_fee: order.price,
          spbill_create_ip: "124.115.115.110",
          trade_type: wxpay.TradeType.Native,
          notify_url: WEPAY_NOTIFY_URL
        });
        break;

      default:
        return Promise.reject(new Parse.Error(400, '不支持的支付类型'))
    }
  }
}

const summary = async (req) => {

  if (!req.user) {
    return Promise.reject(new Parse.Error(Parse.SESSION_MISSING))
  }

  return {
    privateFile: await resumePrivates(req.user),
    publicFile: await resumePublics(req.user)
  }
}

const square = async (req) => {

  return new Promise(async (resolve) => {
    var { index = 1, size = 20, keywords } = req.params

    if (index < 1) {
      index = 1
    }

    if (size > 50) {
      size = 50
    }

    if (keywords && keywords.length > 20) {
      keywords = keywords.substr(0, 20)
    }

    var filter = new Parse.Query(WorksClass)
      .doesNotExist('isPrivate')
      .doesNotExist('isDelete')
      .skip((index - 1) * size)
      .select('name', 'objectId', 'user')
      .limit(size)
      .withCount(true)


    if (!_.isEmpty(keywords)) {
      filter = filter.contains('name', keywords)
    }

    var list = await filter.find({
      useMasterKey: true
    })

    // var likes = await new Parse.Query(LikeClass)
    //   .equalTo('works', list)
    //   .reduce((accumlator, current, index) => {

    //   }, {})
    var promises = await _.map(list.results, (i) => {
      return new Promise(async (resolve) => {
        var likes = await new Parse.Query(LikeClass).equalTo('works', i).count()
        var comments = await new Parse.Query(CommentClass).equalTo('works', i).count()
        resolve({
          user: i.get('user'),
          name: i.get('name'),
          objectId: i.id,
          likes: likes,
          comments: comments
        })
      })
    })

    list.results = await Promise.all(promises)

    resolve(list)
  })

}

const clearRecycle = async (req) => {
  if (!req.user) {
    return Promise.reject(new Parse.Error(Parse.SESSION_MISSING))
  }

  var works = []

  try {
    works = await new Parse.Query(WorksClass).equalTo('user', req.user).equalTo('isDelete', true).find({
      useMasterKey: true
    })
  } catch (error) {
    ParseServer.logger.error(error)
    return Promise.reject(error)
  }

  try {
    await Parse.Object.destroyAll(works, {
      useMasterKey: true
    })
  } catch (error) {

    ParseServer.logger.error(error)
    return Promise.reject(error)
  }

}

const visit = async (req) => {
  const { id } = req.params
  if (_.isEmpty(id)) {
    return Promise.reject('参数失败')
  }

  var model = await new Parse.Query(WorksClass)
    .include(['style', 'user'])
    .get(id, {
      useMasterKey: true
    })

  if (_.isEmpty(model)) {
    return Promise.reject('文件不存在')
  }

  if (model.get('isDelete') === true) {
    return Promise.reject('文件已删除')
  }

  if (model.get('isPrivate') === true) {
    return Promise.reject('该文件已设置私有, 不能访问')
  }



  // var likes = await new Parse.Query(LikeClass).equalTo('works', model).count()
  // var comments = await new Parse.Query(CommentClass).equalTo('works', model).limit(20).addDescending('createdDate').withCount()

  // model.set('likes', likes)
  // model.set('comments', comments)
  return model
}

// const workComments = async (req) => {
//   const { id, index, size } = req.params
//   var comments = await new Parse.Query(CommentClass).equalTo('works', Parse.Model.createWithoutData(id)).skip(size * index).limit(size).addDescending('createdDate').withCount()

//   return comments
// }

module.exports = {
  assumeRole,
  shapesWithCategory,
  shapesForCategory,
  makeAvatar,
  shareFile,
  getCategoryList,
  openWorks,
  changePassword,
  buy,
  planeFee,
  summary,
  square,
  visit,
  clearRecycle
}