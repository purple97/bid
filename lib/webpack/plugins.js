"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _webpack = _interopRequireDefault(require("webpack"));
var _utils = _interopRequireDefault(require("../utils"));
var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));
var _htmlInlineSourceLoaders = _interopRequireDefault(require("../plugins/html-inline-source-loaders"));
var _webpackPluginInlineSource = _interopRequireDefault(require("webpack-plugin-inline-source"));
/*  */

const tagVersion = _utils.default.getUserConfig.version;
function setHtmlPlugin(file, env) {
  const isOnline = ['tag', 'productionNoTag', 'production-build', 'production', 'gray'].indexOf(env) !== -1;
  const htmlOutputDir = _path.default.resolve(process.cwd(), './deploy', isOnline ? './html/build' : './build');
  const cwdDir = _path.default.resolve(process.cwd(), htmlOutputDir || './dist');
  return new _htmlWebpackPlugin.default({
    version: tagVersion,
    inject: 'body',
    // true | 'head' | 'body' ， 主js插入位置(head \ body)
    // hash: true, // true | false, 插入的js文件src后面增加?[hash]值，每次构建唯一
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
    // 配置加入的 <meta/>
    meta: {
      env: env,
      'update-time': {
        'update-time': new Date().toLocaleString()
      }
    },
    path: htmlOutputDir,
    filename: _path.default.resolve(cwdDir, file),
    template: _path.default.resolve(file)
  });
}
function getPlugins({
  htmlEntry,
  env = 'daily',
  cdnhost
}) {
  const jsHost = `${cdnhost || _utils.default.getUserConfig.cdnhost}/${_utils.default.getUserConfig.appName}/`;
  const jsPath = jsHost + _path.default.dirname(`${htmlEntry.replace(/^\.\//, '')}`) + `/${_utils.default.getUserConfig.version}/`;
  let config = [new _webpack.default.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    BUILD_ENV: JSON.stringify(env)
  })];
  if (env == 'local' || env == 'production-build') {
    // 本地构建才显示进度条
    config.push(new _webpack.default.ProgressPlugin({
      percentBy: 'entries'
    }));
  }

  // config.push(new LazyPathPlugin({ version: tagVersion, jsHost, env }))
  if (env !== 'local') {
    config.push(setHtmlPlugin(htmlEntry, env));
    config.push(new _webpackPluginInlineSource.default({
      /* html-webpack-plugin, v5.5 版本
       * 不传入getHooks，它不执行相关hooks
       */
      htmlWebpackPluginHooks: _htmlWebpackPlugin.default.getHooks,
      // 对inline的js代码二次加工
      loaders: _htmlInlineSourceLoaders.default
    }));
  }
  return config;
}
var _default = getPlugins;
exports.default = _default;
module.exports = exports.default;