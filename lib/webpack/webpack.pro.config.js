"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = _interopRequireDefault(require("../utils/"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _performance = _interopRequireDefault(require("./performance"));

var _webpackMerge = require("webpack-merge");

var _webpackBase = _interopRequireDefault(require("./webpack.base.config"));

var cwdPath = process.cwd(); // 工程项目root path

var envTypesByOnline = ['production-build', 'tag', 'productionNoTag', 'production', 'gray'];

var _default = function _default(parentDirPath) {
  return function (outputPath, buildConfig) {
    var jsHost = "".concat(_utils["default"].getUserConfig.cdnhost, "/").concat(_utils["default"].getUserConfig.appName, "/");
    var isOnline = envTypesByOnline.indexOf(buildConfig.env) !== -1;
    var output = outputPath ? outputPath : './build';

    var _filename = isOnline ? 'javascripts/build/[name].js' : '[name].js';

    return (0, _webpackMerge.merge)((0, _webpackBase["default"])(parentDirPath), {
      mode: 'production',
      performance: _performance["default"],
      entry: {},
      output: {
        path: _path["default"].resolve(cwdPath, output),
        filename: _filename,
        // chunkFilename: _filename
        publicPath: isOnline ? jsHost : './'
      },
      resolve: {
        modules: [_path["default"].join(parentDirPath, 'node_modules')]
      },
      plugins: (0, _plugins["default"])(buildConfig.htmlEntry, buildConfig.env)
    });
  };
};

exports["default"] = _default;
module.exports = exports.default;