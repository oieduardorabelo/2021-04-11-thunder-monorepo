require('dotenv').config();

let { environment } = require('./configs/environment');

let { createServer } = require('./applications/create-server');
let { createSwagger } = require('./applications/create-swagger');

let { createDatabase } = require('./interfaces/create-database');

let { compose } = require('./helpers/compose');

let database = createDatabase();
let { server } = compose(
  createSwagger,
  createServer
)({ database, environment });

server.listen(environment.port, function () {
  console.log(`Example app listening on port ${environment.port}!`);
});
