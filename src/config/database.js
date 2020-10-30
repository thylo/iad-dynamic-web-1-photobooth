const path = require("path");
const Datastore = require("nedb"),
  db = new Datastore({
    filename: path.join("database.db"),
    autoload: true,
  });

db.find({}, (err, docs) => {
  console.log(`INFO : There is ${docs.length} docs in database`);
});

module.exports = db;