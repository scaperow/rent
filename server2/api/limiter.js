/**
 * 功能拦截
 */
const _ = require('lodash')
const {Parse} = require('../factory')
const FeatureClass = Parse.Object.extend('feature')

let features = []

const check = async function (user, code, value) {
    var feature = null
    var result = null
    var planeName = user.get('plane') || 'planeA'

    if (features.length === 0) {
        try {
            features = await new Parse.Query(FeatureClass).find()
            features = _.map(features, f => f.toJSON())
        } catch (error) {
            throw error
        }
    }

    if (features.length > 0) {
        feature = _.find(features, { code })
    }

    if (!_.isEmpty(feature)) {
        var condition = feature[planeName]

        if (_.isEmpty(feature.unit) && condition === 0) {
            result = {
                feature
            }
        } else if (!_.isEmpty(feature.unit) && value >= condition && condition !== -1) {
            result = {
                feature
            }
        }
    } else {
        Parse.logger.log('无法找到feature,code:' + code)
    }

    return result
}

module.exports = {
    check
}