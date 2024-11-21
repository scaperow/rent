const _ = require('lodash')
const PictureModel = Parse.Object.extend('picture')
const WorksModel = Parse.Object.extend('works')
const ShareModel = Parse.Object.extend('share')
const { parseRequest } = require('../rest')
const { ossClient, urls } = require('../../factory')
const ParseServer = require('parse-server')


const works = async (request) => {
  let model = request.object.attributes
  let worksQuery = new Parse.Query(WorksModel)

  if (model.isFolder === true) {
    worksQuery.equalTo('parentId', request.object.id).each(async (child) => {
      await child.destroy()
    })
  } else {
    // delete capture from oss
    try {
      await ossClient.remove(urls.captureKey(request.user.id, request.object.id))
    } catch (error) {
      ParseServer.logger.error(error)
    }

    try {
      var shares = await new Parse.Query(ShareModel).find({
        source: request.object.id
      })

      Parse.Object.destroyAll(shares, {
        useMasterKey: true
      })
    } catch (error) {
      ParseServer.logger.error(error)
    }
  }
}

module.exports = {
  works
}