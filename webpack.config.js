const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

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
      client: {
        logging: "verbose",
      },
    },
  };
};
