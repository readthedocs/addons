const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const interceptor = require("express-interceptor");

// Emulates what CloudFlare will do for us
// https://github.com/webpack/webpack-dev-server/issues/4508
var injectReadTheDocsClient = interceptor(function (req, res) {
  return {
    // Only HTML responses will be intercepted
    isInterceptable: function () {
      return /text\/html/.test(res.get("Content-Type"));
    },
    intercept: function (body, send) {
      send(
        body.replace(
          "</head>",
          '<script src="/readthedocs-client.js"></script></head>'
        )
      );
    },
  };
});

// Use export as a function to inspect `--mode`
module.exports = (env, argv) => {
  const is_production = argv.mode == "production";

  return {
    entry: {
      "readthedocs-client": ["./src/index.js"],
    },
    output: {
      filename: "[name].js?[fullhash]",
      chunkFilename: "[name].js?[chunkhash]",
      path: path.join(__dirname, "dist"),
    },
    optimization: {
      minimize: is_production,
      minimizer: [new TerserPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: "css-loader",
          options: {
            exportType: "css-style-sheet",
          },
        },
      ],
    },
    plugins: [],

    // Development options
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ["./node_modules/"],
    },
    devServer: {
      open: false,
      hot: false,
      liveReload: true,
      setupMiddlewares: (middlewares, devServer) => {
        const index = middlewares.findIndex(
          (middleware) => middleware.name === "webpack-dev-middleware"
        );

        middlewares.splice(index, 0, {
          name: "readthedocs-client",
          middleware: injectReadTheDocsClient,
        });
        return middlewares;
      },
      client: {
        logging: "verbose",
      },
    },
  };
};
