const mongoose = require('mongoose');

function db() {
  let uri = process.env.MONGO_ATLAS;
  mongoose.connect(uri);
  return mongoose.connection;
}

module.exports = db;