const _ = require('lodash')
const Capture = require('../capture.js')
const PictureModel = Parse.Object.extend('picture')
const WorksModel = Parse.Object.extend('works')
const { parseRequest, strictGetter } = require('../rest')

const onCreateFolder = async function (request) {
    return validateFolderModel(request)
}

const onUpdateFolder = async function (request) {
    return validateFolderModel(request)
}

const validateFolderModel = async function (request) {
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
    return validateWorks(request)
}

const onUpdateWorks = async function (request) {
    var isValid = true
    var validateMessage = null

    try {
        validateMessage = await validateWorks(request)
    } catch (error) {
        isValid = false
    }

    if (isValid) {
        //var captureData = await Capture.create(request.object.toJSON())
        //request.object.set('capture', captureData)
        //request.object.saveOnSuccess()
        //return Promise.resolve(request.object)
        // request.object.save()

    } else {
        return Promise.reject(validateMessage)
    }
}

const validateWorks = async function (request) {
    return true
}

const picture = async (request) => {
    let model = request.object.attributes
    let pictureQuery = new Parse.Query(PictureModel)
    let count = await pictureQuery.equalTo("name", model.name).equalTo("user.id", model.user.id).count()

    if (count > 0) {
        request.object.set('name', model.name + '(' + count + ')')
    }
};

const setACL = async function (request) {
    var acl = new Parse.ACL()
    acl.setWriteAccess(request.user)

    request.object.setACL(acl)
}

const works = async (request, response) => {
    var isFolder = request.object.get('isFolder')
    let worksQuery = new Parse.Query(WorksModel)

    parseRequest(request, {
        onCreate() {
            setACL(request)

            if (isFolder) {
                return onCreateFolder(request)
            } else {
                return onCreateWorks(request)
            }
        },
        onDelete() {
            if (isFolder) {
                worksQuery.equalTo('parentId', request.object.id).each((object) => {
                    object.set('isDelete', true)
                    object.save()
                })
            }
        },
        onRevert() {
            if (isFolder) {
                worksQuery.equalTo('parentId', request.object.id).each((object) => {
                    object.set('isDelete', false)
                    object.save()
                })
            }
        },
        onUpdate() {
            if (isFolder) {
                return onUpdateFolder(request)
            } else {
                return onUpdateWorks(request)
            }
        }
    })
}

module.exports = {
    works
}