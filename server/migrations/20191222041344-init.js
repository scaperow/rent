
const path = require('path')
const fs = require('fs');
const _ = require('lodash')
const { EJSON } = require('bson');
const asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


module.exports = {
  async up(db, client) {
    var files = fs.readdirSync(path.join(__dirname, 'init'))

    await asyncForEach(files, async (fileName) => {
      let ext = path.extname(fileName)

      if (ext !== 'json') {
        let collectionName = path.basename(fileName, ext)
        let fileContent = fs.readFileSync(path.join(__dirname, 'init', fileName), {
          encoding: 'UTF-8'
        })
        let list = EJSON.parse(fileContent)
        
        try {
          await db.dropCollection(collectionName)
        } catch (e) { }
        try {
          await db.createCollection(collectionName)
        } catch (e) { }

        let collection = db.collection(collectionName)

        collection.insertMany(list)
      }
    })
  },

  async down(db, client) {
    var files = fs.readdirSync(path.join(__dirname, 'init'))
    files.forEach(async (fileName) => {
      var ext = path.extname(fileName)

      if (ext !== 'json') {
        var collectionName = path.basename(fileName, ext)
        try {
          await db.dropCollection(collectionName)
        } catch (e) { }
      }
    })
  }
};