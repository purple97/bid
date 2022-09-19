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

var _optimization = _interopRequireDefault(require("./optimization"));

var _externals = require("./externals");

var _webpackMerge = require("webpack-merge");

var _webpackBase = _interopRequireDefault(require("./webpack.base.config"));

const cwdPath = process.cwd(); // 工程项目root path

const envTypesByOnline = ['production-build', 'tag', 'productionNoTag', 'production', 'gray'];

var _default = (parentDirPath, option = {}) => (outputPath, buildConfig) => {
  const isOnline = envTypesByOnline.indexOf(buildConfig.env) !== -1;
  const output = outputPath ? outputPath : './deploy';
  const jsHost = `${buildConfig.cdnhost || _utils.default.getUserConfig.cdnhost}/${_utils.default.getUserConfig.appName}/`;
  const jsPath = `${jsHost}${output.replace(/^.*\/src/, 'src')}`;
  const env = !isOnline ? 'daily' : buildConfig.env === 'gray' ? 'gray' : 'production';
  return (0, _webpackMerge.merge)((0, _webpackBase.default)(parentDirPath), {
    mode: 'production',
    // performance: performance,
    entry: {},
    output: {
      path: _path.default.resolve(cwdPath, output),
      filename: '[name].[contenthash:10].js',
      // chunkFilename: _filename
      publicPath: isOnline ? jsPath + '/' : `./${_utils.default.getUserConfig.version}/`
    },
    //打包多文件和公共模块配置, dev环境下没有使用html-webpack-plugin，无法自动引入分离的包
    optimization: _optimization.default,
    // webpack5下部分被废弃
    resolve: {
      modules: [_path.default.join(parentDirPath, 'node_modules')]
    },
    externals: (0, _externals.getExternals)(env),
    plugins: (0, _plugins.default)({
      htmlEntry: buildConfig.htmlEntry,
      env
    })
  }, option);
};

exports.default = _default;
module.exports = exports.default;