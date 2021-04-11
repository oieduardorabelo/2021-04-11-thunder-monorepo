let path = require('path');
let util = require('util');
let nedb = require('nedb');

let pathFixture = path.resolve(__dirname, './fixtures/database.json');

function createDatabase() {
  let database = new nedb({
    filename: pathFixture,
    autoload: true,
  });

  database.find = util.promisify(database.find);

  return database;
}

module.exports = { createDatabase };
