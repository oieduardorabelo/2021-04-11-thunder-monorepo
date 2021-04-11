let supertest = require('supertest');

let { createServer } = require('../../applications/create-server');
let { createSwagger } = require('../../applications/create-swagger');

test('it creates swagger docs endpoint', async () => {
  let ports = {};
  let { server } = createSwagger(createServer(ports));
  let req = await supertest(server).get('/docs');
  expect(req.status).toBe(301);
  expect(req.headers.location).toBe('/docs/');
  expect(req.text).toMatchInlineSnapshot(`
    "<!DOCTYPE html>
    <html lang=\\"en\\">
    <head>
    <meta charset=\\"utf-8\\">
    <title>Redirecting</title>
    </head>
    <body>
    <pre>Redirecting to <a href=\\"/docs/\\">/docs/</a></pre>
    </body>
    </html>
    "
  `);
});
