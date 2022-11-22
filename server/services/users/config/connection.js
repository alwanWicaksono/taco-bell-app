const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://alwanwew:fadil@cluster0.ukcgm0l.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
let database;

async function connect() {
  try {
    await client.connect();
    console.log("connect to mongoDb")
    database = client.db("p3-challenge-2");
  } catch (err) {
    console.log(err);
  }
}

function getDatabase() {
  return database;
}

module.exports = {
  connect,
  getDatabase,
};