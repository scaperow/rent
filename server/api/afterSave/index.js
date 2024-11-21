const _ = require('lodash')
const Capture = require('../capture.js')
const PictureModel = Parse.Object.extend('picture')
const WorksModel = Parse.Object.extend('works')
const { parseRequest } = require('../rest')
const OSS = require('ali-oss')
const fs = require('fs')
const os = require('os')
const path = require('path')

const {
    OSS_REGION: region,
    OSS_KEY: accessKeyId,
    OSS_SECRET: accessKeySecret,
    BUCKET: bucket
} = process.env

let client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
});

async function takeCapture(request) {
    var original = null
    if (request.original) {
        original = request.original.toJSON()

        var { raw: lastRaw, setting: lastSetting, style: lastStyle, isPrivate: isLastPrivate } = original
        var { raw, setting, style, isPrivate } = request.object.toJSON()
        var fileName = null
        var key = `/users/${request.user.id}/map/${request.object.id}`

        if (lastRaw !== raw || lastSetting !== setting || lastStyle !== style) {
            try {
                var object = await new Parse.Query(WorksModel).include('style').get(request.object.id, {
                    useMasterKey: true
                })
                var fileName = path.join(os.tmpdir(), `${request.object.id}.png`)
                var captureData = await Capture.create(object.toJSON())

                if (captureData) {
                    fs.writeFileSync(fileName, captureData.replace(/^data:image\/png;base64,/, ""), { encoding: 'base64' })

                    await client.put(key, fileName, {
                        mime: 'image/png'
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

}

const works = async function (request) {
    parseRequest(request, {
        onCreate() {
            return takeCapture(request)
        },
        onUpdate() {
            return takeCapture(request)
        }
    })
}



module.exports = {
    works
}