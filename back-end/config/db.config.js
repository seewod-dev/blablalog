const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const mongoHost = process.env.MONGO_HOST || "127.0.0.1";
const uri = `mongodb://${mongoHost}:27017`;
const client = new MongoClient(uri);

const database = client.db('BlaBlaLog');

module.exports = database