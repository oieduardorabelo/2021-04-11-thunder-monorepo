let supertest = require('supertest');

let { createServer } = require('../../applications/create-server');
let { createDatabase } = require('../../interfaces/create-database');

test('it creates a server application', () => {
  let { server } = createServer({});
  expect(typeof server.listen).toBe('function');
});

test('404 - GET /random-router - returns an error', async () => {
  let { server } = createServer({});
  let req = await supertest(server).get('/random.router');
  expect(req.status).toBe(404);
  expect(req.text).toMatchInlineSnapshot(`
    "<!DOCTYPE html>
    <html lang=\\"en\\">
    <head>
    <meta charset=\\"utf-8\\">
    <title>Error</title>
    </head>
    <body>
    <pre>Cannot GET /random.router</pre>
    </body>
    </html>
    "
  `);
});

test('500 GET /v1/people - without database interface it returns an error', async () => {
  let { server } = createServer({});
  let req = await supertest(server).get('/v1/people');
  expect(req.status).toBe(500);
  expect(req.text).toMatchInlineSnapshot(
    `"{\\"ok\\":false,\\"payload\\":{\\"message\\":\\"Cannot read property 'find' of undefined\\"}}"`
  );
});

test('200 GET /v1/people - returns all people', async () => {
  let database = createDatabase();
  let { server } = createServer({ database });
  let req = await supertest(server).get('/v1/people');
  expect(req.status).toBe(200);
  expect(req.body.payload).toHaveLength(4);
});

test('200 GET /v1/people - filter people by gender', async () => {
  let database = createDatabase();
  let { server } = createServer({ database });
  let req = await supertest(server).get('/v1/people?gender=female');
  expect(req.status).toBe(200);
  expect(req.body.payload).toHaveLength(2);
});

test('200 GET /v1/people - filter people by age, with default operator [gte]', async () => {
  let database = createDatabase();
  let { server } = createServer({ database });
  let req = await supertest(server).get('/v1/people?age=40');
  expect(req.status).toBe(200);
  expect(req.body.payload).toHaveLength(1);
});

test('200 GET /v1/people - filter people by age with defined operator', async () => {
  let database = createDatabase();
  let { server } = createServer({ database });
  let req = await supertest(server).get('/v1/people?age=40&op=lt');
  expect(req.status).toBe(200);
  expect(req.body.payload).toHaveLength(3);
});

test('200 GET /v1/people - filter people by age with operator and gender', async () => {
  let database = createDatabase();
  let { server } = createServer({ database });
  let req = await supertest(server).get('/v1/people?age=30&op=gte&gender=male');
  expect(req.status).toBe(200);
  expect(req.body.payload).toHaveLength(1);
});
