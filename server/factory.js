// keep some instance used for globals only
// set configuras to third-party  only once
let OSS = require('ali-oss')
let _ = require('lodash')
let Crypto = require('crypto')
let Identicon = require('identicon.js')
let parse = require('parse/node')
const { wxpay, alipay } = require('3rd-party-pay')
let ParseServer = require('parse-server')


const {
    ALIPAY_APP_ID,
    ALIPAY_NOTIFY_URL,
    ALIPAY_RSA_PRIVATE,
    ALIPAY_RSA_PUBLIC,
    ALIPAY_KEY,
    ALIPAY_URL } = process.env

alipay.AliPayStatic.config({
    sandbox: false,
    host: ALIPAY_URL,
    sign_type: "RSA2",
    requestLog: log => {
        ParseServer.logger.info(log)
    }
});

wxpay.WxPayStatic.config({
    host: '',
    sandbox: false,
    //记录请求
    requestLog: log => {
        //console.log("wx", log);
        ParseServer.logger.info(log)
    }
});

const {
    WEPAY_KEY, WEPAY_MECH_ID, WEPAY_APP_ID, WEPAY_CERTIFICATE } = process.env

// let wepayInst = new wxpay.WxPay({
//     mch_id: WEPAY_MECH_ID,
//     key: WEPAY_KEY,
//     appid: WEPAY_APP_ID,
//     pfxPath: WEPAY_CERTIFICATE
// });



// let alipayInstance = new alipay.AliPay({
//     app_id: ALIPAY_APP_ID,
//     notify_url: ALIPAY_NOTIFY_URL,
//     rsaPrivatePath: ALIPAY_RSA_PRIVATE,
//     rsaPublicPath: ALIPAY_RSA_PUBLIC
// });

const {
    OSS_REGION: region,
    OSS_KEY: accessKeyId,
    OSS_SECRET: accessKeySecret,
    BUCKET: bucket
} = process.env

let ossClient = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
});

let ossSts = new OSS.STS({
    accessKeyId,
    accessKeySecret
})

const {
    SSL_FORCE: sslForce,
    SERVER_DOMAIN,
    APP_ID,
    SERVER_PORT,
    MASTER_KEY, } = process.env

var url = sslForce ? `https://${SERVER_DOMAIN}/api` : `http://${SERVER_DOMAIN}:${SERVER_PORT}/api`;

Parse.initialize(APP_ID, 'javascript', MASTER_KEY)
Parse.serverURL = url

const urls = {
    captureKey(userId, fileId) {
        return `/users/${userId}/thumbnail/${fileId}`
    },

    avatarUrl(userId) {
        return `/users/${userId}/avatar`
    }
}
module.exports = {
    ossClient,
    ossSts,
    // alipay: alipayInstance,
    wepay: {},
    Parse,
    urls
}