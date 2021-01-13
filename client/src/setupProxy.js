const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://react.smartq.kr:5000",
      changeOrigin: true,
    })
  );
};