"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _utils = _interopRequireDefault(require("../utils/"));

var _module = _interopRequireDefault(require("./module"));

var _resolve = _interopRequireDefault(require("./resolve"));

var _externals = _interopRequireDefault(require("./externals"));

const cwdPath = process.cwd(); // 工程项目root path

function _default(parentDirPath) {
  // Utils.setParentDir(parentDirPath) //设置br-bid所在目录， 方便babel-loader查找相关依赖
  //
  return {
    mode: 'production',
    target: ['web', 'es5'],
    // webpack5属性
    entry: {},
    output: {
      path: _path.default.resolve(cwdPath, './build'),
      filename: '[name].js',
      chunkFilename: '[id].[contenthash:10].js',
      // hash | chunkhash | contenthash
      publicPath: './'
    },
    resolveLoader: {
      modules: [_path.default.join(cwdPath, 'node_modules'), _path.default.join(__dirname, '../../node_modules'), _path.default.join(parentDirPath, 'node_modules')]
    },
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