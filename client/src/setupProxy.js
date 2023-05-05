const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/graphql", {
            target: "http://localhost:4000/graphql",
            changeOrigin: true,
            pathRewrite: (path) => path.replace(/^\/graphql/, ""),
        })
    );

    app.use(
        createProxyMiddleware("/graphql", {
            target: "ws://localhost:400/graphql",
            changeOrigin: true,
            ws: true,
            pathRewrite: (path) => path.replace(/^\/graphql/, ""),
        })
    );
};