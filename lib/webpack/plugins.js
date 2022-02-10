"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _utils = _interopRequireDefault(require("../utils"));

var _htmlWebpackPlugin = _interopRequireDefault(require("../plugins/html-webpack-plugin"));

var _htmlInlineSourceLoaders = _interopRequireDefault(require("../plugins/html-inline-source-loaders"));

var _htmlWebpackReplaceHost = _interopRequireDefault(require("html-webpack-replace-host"));

var _webpackPluginInlineSource = _interopRequireDefault(require("webpack-plugin-inline-source"));

var _friendlyErrorsWebpackPlugin = _interopRequireDefault(require("friendly-errors-webpack-plugin"));

var _progressBarWebpackPlugin = _interopRequireDefault(require("progress-bar-webpack-plugin"));

var _wasmModuleWebpackPlugin = _interopRequireDefault(require("wasm-module-webpack-plugin"));

/*  */
// import { CleanWebpackPlugin } from 'clean-webpack-plugin'
// import LazyPathPlugin from 'bid-lazy-path-plugin'
const tagVersion = _utils.default.getUserConfig.version;

function setHtmlPlugin(file, env) {
  const isOnline = ['tag', 'productionNoTag', 'production-build', 'production', 'gray'].indexOf(env) !== -1; // let chunksName = path.dirname(file) + '/' + tagVersion + '/index'
  // chunksName = chunksName.replace(/^\.\//, '')
  // chunksName = isOnline ? chunksName.replace(/[.\d]*\/index/g, 'index') : chunksName;
  // const _filename = isOnline ? path.join('./html/build', file) : file

  return new _htmlWebpackPlugin.default({
    version: tagVersion,
    inject: true,
    hash: true,
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
    path: _path.default.resolve(process.cwd(), './deploy', isOnline ? './html/build' : './build'),
    filename: file,
    template: _path.default.resolve(file)
  });
}

function getPlugins({
  htmlEntry,
  env = 'local',
  cdnhost
}) {
  const jsHost = `${cdnhost || _utils.default.getUserConfig.cdnhost}/${_utils.default.getUserConfig.appName}/`;
  const jsPath = jsHost + _path.default.dirname(`${htmlEntry.replace(/^\.\//, '')}`) + `/${_utils.default.getUserConfig.version}/`;
  let config = [new _webpack.default.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }), //避免重复的模块
  // new webpack.optimize.DedupePlugin()

  /* 跳过编译时出错的代码并记录 , webpack.NoErrorsPlugin webpack4后改为webpack.NoEmitOnErrorsPlugin */
  new _webpack.default.NoEmitOnErrorsPlugin(), new _wasmModuleWebpackPlugin.default.WebpackPlugin()];

  if (process.env.NODE_ENV != 'dev') {
    if (env == 'local' || env == 'daily' || env == 'production-build') {
      config.unshift(new _progressBarWebpackPlugin.default()); // config.push(new CleanWebpackPlugin())
    } // config.push(new LazyPathPlugin({ version: tagVersion, jsHost, env }))


    config.push(setHtmlPlugin(htmlEntry, env)); // console.log(jsPath)

    config.push(new _htmlWebpackReplaceHost.default({
      replaceString: env == 'local' || env == 'daily' ? '' : jsPath
    }));
    config.push(new _webpackPluginInlineSource.default({
      loaders: _htmlInlineSourceLoaders.default
    }));
  } else {
    // config.push(new webpack.NamedModulesPlugin())
    config.push(new _friendlyErrorsWebpackPlugin.default());
  } // console.log(config);


  return config;
}

var _default = getPlugins;
exports.default = _default;
module.exports = exports.default;