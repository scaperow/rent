const functions = require('./functions/index')
const beforeSave = require('./beforeSave/index')
const afterSave = require('./afterSave/index')
const afterDelete = require('./afterDelete/index')
const _ = require('lodash')


const afterFindHooks = {
  /*
  'organization': async ({ objects, object }) => {
    const shapeQuery = new Parse.Query(ShapeClass)

    const promises = _.map(objects || [object], (item) => {
      let category = item

      return new Promise(async (resolve) => {
        const shapes = await shapeQuery.equalTo("category", category).find()

        category.set('shapes', _.map(shapes, (shape) => {
          return _.pick(shape.toJSON(), "objectId", "name", "tag", "model", "organization")
        }))

        resolve(category)
      })
    });

    const result = await Promise.all(promises)
    return result

 }*/


}

const registCloudFunction = () => {
  _.each(functions, (value, key) => {
    Parse.Cloud.define(key, value)
  })

  _.each(afterFindHooks, (value, key) => {
    // Parse.Cloud.afterFind(key, value)
  })

  _.each(beforeSave, (value, key) => {
    Parse.Cloud.beforeSave(key, value)
  })

  _.each(afterSave, (value, key) => {
    Parse.Cloud.afterSave(key, value)
  })

  _.each(afterDelete, (value, key) => {
    Parse.Cloud.afterDelete(key, value)
  })
}

registCloudFunction()