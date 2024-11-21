const _ = require('lodash')
const strictGetter = function (parseObject, keyName) {
  return parseObject.has(keyName) ? parseObject.get(keyName) : undefined
}

const parseRequest = function (request, { onCreate, onDelete, onRevert, onUpdate, onSave }) {
  var changes = request.object.dirtyKeys()

  if (_.has(changes, 'isDelete')) {
    if (request.object.isDelete) {
      onDelete && onDelete()
    } else {
      onRevert && onRevert()
    }
  } else {
    onSave && onSave()
    
    if (request.object.id) {
      onUpdate && onUpdate()
    } else {
      onCreate && onCreate()
    }
  }
}

module.exports = {
  strictGetter,
  parseRequest
}