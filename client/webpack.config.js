const CompressionPlugin = require("compression-webpack-plugin"); //gzip
const BrotliPlugin = require("brotli-webpack-plugin"); //brotli
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function (webpackEnv, config) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
      },
    ];
  }

  //compress bundle
  plugins: [
    new CompressionPlugin({
      //gzip plugin
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      //brotli plugin
      asset: "[path].br[query]",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ExtractTextPlugin("styles.css"),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ];
};
