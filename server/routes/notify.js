
var ParseServer = require('parse-server')
var express = require('express')
var router = express.Router()
var { alipay, wepay, Parse } = require('../factory')
var payment = require('3rd-party-pay')
var _ = require('lodash')
const OrderClass = Parse.Object.extend('order')
const ServiceClass = Parse.Object.extend('service')

async function afterSuccessPay(orderNumber, from) {
    // 查找 order
    // 更新 order 支付状态
    // 更新用户
    var order = await new Parse.Query(OrderClass).equalTo('number', orderNumber).first({
        useMasterKey: true
    })

    if (!order) {
        throw new Error('找不到该订单')
    }

    var user = order.get('user')

    await order.save({
        status: 'success',
        'payUse': from
    }, { useMasterKey: true })

    await user.save({ plane: order.get('plane') }, {
        useMasterKey: true
    })
}


router.post("/alipay", async (req, res) => {
    var result = null
    var { out_trade_no: orderNumber, trade_status: status } = req.body
    try {
        var result = await alipay.payNotifyHandler(req.body, () => {
            return Promise.resolve()
        })
    } catch (error) {
        ParseServer.logger.error(error)
    }

    if (result !== 'success') {
        return ParseServer.logger.error('支付宝回调处理失败')
    }

    if (status === 'TRADE_SUCCESS') {
        try {
            await afterSuccessPay(orderNumber, 'ALIPAY')

            res.status(200).send('success')
        } catch (error) {
            console.error(error)
            ParseServer.logger.error(`订单号:${orderNumber} 已支付，但是后续处理失败，原因：${error.message}`)
        }
    }


})

module.exports = router;