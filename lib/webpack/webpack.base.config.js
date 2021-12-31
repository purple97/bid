"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _module = _interopRequireDefault(require("./module"));

var _resolve = _interopRequireDefault(require("./resolve"));

var _externals = _interopRequireDefault(require("./externals"));

var _optimization = _interopRequireDefault(require("./optimization"));

const cwdPath = process.cwd(); // 工程项目root path

function _default(parentDirPath) {
  //
  return {
    mode: 'production',
    // devtool: 'source-map',
    entry: {},
    output: {
      path: _path.default.resolve(cwdPath, './build'),
      filename: '[name].js',
      chunkFilename: '[id].[hash:10].js',
      publicPath: '/'
    },
    //打包多文件和公共模块配置
    optimization: _optimization.default,
    resolveLoader: {
      modules: [_path.default.join(cwdPath, 'node_modules'), _path.default.join(__dirname, '../../node_modules'), _path.default.join(parentDirPath, 'node_modules')]
    },
    externals: _externals.default,
    module: (0, _module.default)(),
    resolve: _resolve.default,
    experiments: {
      asyncWebAssembly: true,
      // 开启 webpack5 的 asyncWebAssembly 功能
      syncWebAssembly: true,
      topLevelAwait: true // 开启 top-level-await

    }
  };
}

module.exports = exports.default;