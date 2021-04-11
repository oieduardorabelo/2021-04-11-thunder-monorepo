let express = require('express');
let cors = require('cors');

let people = require('../routes/people');

function createServer(ports) {
  let server = express();

  server.use(
    cors({
      origin: ports.environment.corsOriginList,
    })
  );

  server.use((req, res, next) => {
    res.locals.ports = ports;
    next();
  });

  server.use('/v1/people', people.router);

  server.use((err, req, res, next) => {
    let payload = {
      message: err.message,
      code: err.code,
    };
    res.status(500).json({ ok: false, payload });
  });

  ports.server = server;

  return ports;
}

module.exports = { createServer };
