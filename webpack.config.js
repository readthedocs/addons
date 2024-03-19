const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const interceptor = require("express-interceptor");
const webpack = require("webpack");

// Emulates what CloudFlare will do for us
// https://github.com/webpack/webpack-dev-server/issues/4508
var injectReadTheDocsAddons = interceptor(function (req, res) {
  return {
    // Only HTML responses will be intercepted
    isInterceptable: function () {
      return /text\/html/.test(res.get("Content-Type"));
    },
    intercept: function (body, send) {
      send(
        body.replace(
          "</head>",
          '<script async type="text/javascript" src="/readthedocs-addons.js"></script></head>',
        ),
      );
    },
  };
});

// Use export as a function to inspect `--mode`
module.exports = (env, argv) => {
  const is_production = argv.mode == "production";

  return {
    entry: {
      "readthedocs-addons": ["./src/init.js"],
    },
    output: {
      filename: "[name].js?[fullhash]",
      chunkFilename: "[name].js?[chunkhash]",
      path: path.join(__dirname, "dist"),
    },
    optimization: {
      minimize: is_production,
      minimizer: [
        new TerserPlugin({
          // Avoids creating a `.LICENSE.txt` file
          extractComments: false,
          terserOptions: {
            sourceMap: true,
          },
        }),
      ],
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
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.svg/,
          type: "asset/inline",
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        WEBPACK_IS_PRODUCTION: JSON.stringify(is_production),
        WEBPACK_IS_TESTING: JSON.stringify(false),
      }),
    ],

    // Development options
    devtool: "source-map",
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: ["/node_modules/", "**/node_modules/"],
    },
    devServer: {
      // Allow CORS when working locally
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
      open: false,
      port: 8000,
      hot: false,
      liveReload: true,
      allowedHosts: "all",

      setupMiddlewares: (middlewares, devServer) => {
        const index = middlewares.findIndex(
          (middleware) => middleware.name === "webpack-dev-middleware",
        );

        middlewares.splice(index, 0, {
          name: "readthedocs-addons",
          middleware: injectReadTheDocsAddons,
        });
        return middlewares;
      },
      client: {
        logging: "verbose",
      },
    },
  };
};
