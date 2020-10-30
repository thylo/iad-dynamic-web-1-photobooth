const path = require("path");
const Datastore = require("nedb"),
  db = new Datastore({
    filename: path.join("..", "..", "database.db"),
    autoload: true
  });

module.exports = Datastore;
