let { PORT = 5000 } = process.env;

let environment = {
  port: Number(PORT),
  corsOriginList: 'http://localhost:3000',
};

module.exports = {
  environment,
};
