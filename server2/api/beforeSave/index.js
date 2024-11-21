const _ = require('lodash')
const limiter = require('../limiter')
const PictureModel = Parse.Object.extend('picture')
const WorksModel = Parse.Object.extend('works')
const { parseRequest, strictGetter } = require('../rest')
const summary = require('../summary')


const onCreateFolder = async function (request) {
  return validateFolderModel(request)
}

const onUpdateFolder = async function (request) {
  return validateFolderModel(request)
}

const validateFolder = async function (request) {
  var model = request.object.attributes
  var worksQuery = new Parse.Query(WorksModel)

  if (model.parentId) {
    let parentModel = await worksQuery.get(model.parentId)
    if (parentModel) {
      request.object.set('level', (parentModel.level || 1) + 1)
    } else {
      request.object.set('level', 1)
    }

    if (request.object.get('level') >= 16) {
      return Promise.reject('最多只能创建 16 层深的目录')
    }
  }
}

const onCreateWorks = async function (request) {
  var isValid = true
  var validateMessage = null

  try {
    validateMessage = await validateWorks(request)
  } catch (error) {
    isValid = false
  }

  if (isValid) {
  } else {
    return Promise.reject(validateMessage)
  }
}

const onUpdateWorks = async function (request) {
  var isValid = true
  var validateMessage = null

  try {
    validateMessage = await validateWorks(request)
    request.object.set('user', request.user)
  } catch (error) {
    isValid = false
  }

  if (isValid) {
  } else {
    return Promise.reject(validateMessage)
  }
}

async function validateWorks(request) {

}

function presetData(request) {

}


const picture = async (request) => {
  let model = request.object.attributes
  let pictureQuery = new Parse.Query(PictureModel)
  let count = await pictureQuery.equalTo("name", model.name).equalTo("user.id", model.user.id).count()

  if (count > 0) {
    request.object.set('name', model.name + '(' + count + ')')
  }
};



const works = async (request, response) => {
  validateWorks()
  presetData(request)
  if (request.object.get('isFolder') === true) {
    parseRequest(request, {
      onDelete() {
        worksQuery.equalTo('parentId', request.object.id).each((object) => {
          object.set('isDelete', true)
          object.save()
        })
      },
      onRevert() {
        worksQuery.equalTo('parentId', request.object.id).each((object) => {
          object.unset('isDelete')
          object.save()
        })
      }
    })
  } else {
    parseRequest(request, {
      async onSave() {
        // feature limit
        if (_.includes(request.object.dirtyKeys(), 'isPrivate')) {

          var intercepted = null
          if (request.object.get('isPrivate') === true) {
            var privates = await summary.resumePrivates(request.user)
            intercepted = await limiter.check(request.user, 'PRIVATE_FILE', privates)
          } else {
            var publics = await summary.resumePublics(request.user)
            intercepted = await limiter.check(request.user, 'PUBLIC_FILE', publics)
          }

          if (intercepted) {
            return Promise.reject(intercepted)
          }
        }

        // validate

        // set sytem data
        request.object.set('user', request.user)

        var acl = new Parse.ACL()
        acl.setWriteAccess(request.user.id, true)
        acl.setReadAccess(request.user.id, true)
        request.object.setACL(acl)


      }
    })
  }
}



module.exports = {
  picture,
  works
}