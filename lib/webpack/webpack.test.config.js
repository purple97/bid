"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _externals = require("./externals");

var _webpackMerge = require("webpack-merge");

var _webpackBase = _interopRequireDefault(require("./webpack.base.config"));

var _speedMeasureWebpackPlugin = _interopRequireDefault(require("speed-measure-webpack-plugin"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

// import pluginsConfig from './plugins';
const cwdPath = process.cwd(); // 工程项目root path

const analyzerConfig = {
  analyzerMode: 'server',
  analyzerHost: '127.0.0.1',
  analyzerPort: 8866
};

const WebpackConfig = (parentDirPath, option = {}) => outputPath => {
  const output = outputPath ? outputPath : './deploy';
  const smp = new _speedMeasureWebpackPlugin.default();
  return smp.wrap((0, _webpackMerge.merge)((0, _webpackBase.default)(parentDirPath), {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {},
    output: {
      path: _path.default.resolve(cwdPath, output),
      filename: '[name].js',
      chunkFilename: '[id].js',
      publicPath: '/'
    },
    resolve: {
      modules: [_path.default.join(parentDirPath, 'node_modules')]
    },
    externals: (0, _externals.getExternals)('daily'),
    plugins: [new _webpackBundleAnalyzer.BundleAnalyzerPlugin(analyzerConfig), new _webpack.default.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }), new _webpack.default.NoEmitOnErrorsPlugin()]
  }, option));
}; // export default WebpackConfig;


module.exports = WebpackConfig;