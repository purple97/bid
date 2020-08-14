"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = _interopRequireDefault(require("../utils/"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _performance = _interopRequireDefault(require("./performance"));

var _webpackMerge = require("webpack-merge");

var _webpackBase = _interopRequireDefault(require("./webpack.base.config"));

const cwdPath = process.cwd(); // 工程项目root path

const envTypesByOnline = ['production-build', 'tag', 'productionNoTag', 'production', 'gray'];

var _default = parentDirPath => (outputPath, buildConfig) => {
  const jsHost = `${buildConfig.cdnhost || _utils.default.getUserConfig.cdnhost}/${_utils.default.getUserConfig.appName}/`;
  const isOnline = envTypesByOnline.indexOf(buildConfig.env) !== -1;
  const output = outputPath ? outputPath : './deploy';

  const _filename = isOnline ? 'javascripts/build/[name].js' : '[name].js';

  return (0, _webpackMerge.merge)((0, _webpackBase.default)(parentDirPath), {
    mode: 'production',
    performance: _performance.default,
    entry: {},
    output: {
      path: _path.default.resolve(cwdPath, output),
      filename: _filename,
      // chunkFilename: _filename
      publicPath: isOnline ? jsHost : './'
    },
    resolve: {
      modules: [_path.default.join(parentDirPath, 'node_modules')]
    },
    plugins: (0, _plugins.default)(buildConfig)
  });
};

exports.default = _default;
module.exports = exports.default;