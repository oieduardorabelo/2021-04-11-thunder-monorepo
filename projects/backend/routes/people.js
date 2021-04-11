let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
  let { gender, age, op = 'gte' } = req.query;

  let query = {};
  if (gender) {
    query.gender = gender;
  }
  if (age && op) {
    query.age = { [`$${op}`]: Number(age) };
  }

  let projection = {};

  res.locals.ports.database
    .find(query, projection)
    .then((payload) => {
      setTimeout(() => {
        res.status(200).json({ ok: true, payload });
      }, 2000);
    })
    .catch(next);
});

module.exports = { router };
