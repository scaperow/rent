// In this file you can configure migrate-mongo


const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const { MONGO_URI: url, DATA_BASE_NAME: databaseName, REPLICA_SET: replicaSet } = process.env


const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url,
    databaseName,
    options: {
      useUnifiedTopology: true,
      replicaSet
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog"
};

// Return the config as a promise
module.exports = config;
