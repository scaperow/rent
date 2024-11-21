
const OSS = require('ali-oss')

const {
    OSS_REGION: region,
    OSS_KEY: accessKeyId,
    OSS_SECRET: accessKeySecret,
    BUCKET: bucket
} = process.env


const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
});



module.exports = {
    client,
    urls
}