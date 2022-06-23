"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _externals = require("./externals");

var _webpackMerge = require("webpack-merge");

var _webpackBase = _interopRequireDefault(require("./webpack.base.config"));

const cwdPath = process.cwd(); // 工程项目root path

const WebpackConfig = (parentDirPath, option = {}) => (outputPath, filePath) => {
  const output = outputPath ? outputPath : './build';
  const env = 'local';
  return (0, _webpackMerge.merge)((0, _webpackBase.default)(parentDirPath), {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {},
    output: {
      path: _path.default.resolve(cwdPath, output),
      filename: '[name].js',
      chunkFilename: '[id].js',
      //
      publicPath: '/'
    },
    resolve: {
      modules: [_path.default.join(parentDirPath, 'node_modules')]
    },
    externals: (0, _externals.getExternals)(env),
    plugins: (0, _plugins.default)({
      htmlEntry: filePath,
      env
    })
  }, option);
}; // export default WebpackConfig;


module.exports = WebpackConfig;