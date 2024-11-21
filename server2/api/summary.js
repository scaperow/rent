
const _ = require('lodash')
const { Parse } = require('../factory')

const WorksClass = Parse.Object.extend('works')
const HistoryClass = Parse.Object.extend('history')
const resumePublics = async function (user) {
    return await new Parse.Query(WorksClass).notEqualTo('isPrivate', true).equalTo('user', user).count({
        useMasterKey: true
    })
}

const resumePrivates = async function (user) {
    return await new Parse.Query(WorksClass).equalTo('isPrivate', true).equalTo('user', user).count({
        useMasterKey: true
    })
}

const resumeHistories = async function (works) {
    return await new Parse.Query(HistoryClass).equalTo('works', works).find({
        useMasterKey: true
    })
}

module.exports = {
    resumePublics,
    resumePrivates,
    resumeHistories
}