const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const mongoUriFromEnv = process.env.MONGO_URI;
const mongoHost = process.env.MONGO_HOST || "127.0.0.1";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;
const mongoAuthSource = process.env.MONGO_AUTH_SOURCE || "admin";
const uri = mongoUriFromEnv
  || (mongoUser && mongoPass
    ? `mongodb://${encodeURIComponent(mongoUser)}:${encodeURIComponent(mongoPass)}@${mongoHost}:${mongoPort}/BlaBlaLog?authSource=${mongoAuthSource}`
    : `mongodb://${mongoHost}:${mongoPort}`);
const client = new MongoClient(uri);

const dbName = process.env.MONGO_DBNAME || 'BlaBlaLog';
const database = client.db(dbName);

module.exports = database
