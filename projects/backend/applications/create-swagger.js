let swaggerUi = require('swagger-ui-express');
let yamljs = require('yamljs');
let path = require('path');

let swaggerDocumentPath = path.resolve(__dirname, '../configs/swagger.yaml');
let swaggerDocument = yamljs.load(swaggerDocumentPath);

function createSwagger(ports) {
  ports.server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );

  ports.server.use((req, res) => {
    res.redirect('/docs/');
  });

  return ports;
}

module.exports = { createSwagger };
