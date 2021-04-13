let { PORT, CORS_ORIGIN_LIST } = process.env;

let environment = {
  port: Number(PORT),
  corsOriginList: CORS_ORIGIN_LIST,
};

module.exports = {
  environment,
};
