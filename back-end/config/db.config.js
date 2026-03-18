const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const cfg = require("./appConfig")
const mongoUriFromEnv = (cfg.mongo && cfg.mongo.uri) || undefined;
const mongoHost = (cfg.mongo && cfg.mongo.host) || "127.0.0.1";
const mongoPort = (cfg.mongo && cfg.mongo.port) || "27017";
const mongoUser = (cfg.mongo && cfg.mongo.user) || undefined;
const mongoPass = (cfg.mongo && cfg.mongo.password) || undefined;
const mongoAuthSource = (cfg.mongo && cfg.mongo.authSource) || "admin";
const dbName = (cfg.mongo && cfg.mongo.dbname) || 'BlaBlaLog';
const uri = mongoUriFromEnv
  || (mongoUser && mongoPass
    ? `mongodb://${encodeURIComponent(mongoUser)}:${encodeURIComponent(mongoPass)}@${mongoHost}:${mongoPort}/${dbName}?authSource=${mongoAuthSource}`
    : `mongodb://${mongoHost}:${mongoPort}`);
const client = new MongoClient(uri);

const database = client.db(dbName);

module.exports = database
