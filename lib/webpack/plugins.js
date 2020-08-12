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

var _cleanWebpackPlugin = require("clean-webpack-plugin");

var _htmlWebpackReplaceHost = _interopRequireDefault(require("html-webpack-replace-host"));

var _bidLazyPathPlugin = _interopRequireDefault(require("bid-lazy-path-plugin"));

var _webpackPluginInlineSource = _interopRequireDefault(require("webpack-plugin-inline-source"));

var _friendlyErrorsWebpackPlugin = _interopRequireDefault(require("friendly-errors-webpack-plugin"));

var _progressBarWebpackPlugin = _interopRequireDefault(require("progress-bar-webpack-plugin"));

/*  */
const tagVersion = _utils.default.getUserConfig.version;

function setHtmlPlugin(file, env) {
  const isOnline = env === 'tag' || env === 'productionNoTag' || env == 'production' || env === 'gray';
  let chunksName = _path.default.dirname(file) + '/' + tagVersion + '/index';
  chunksName = chunksName.replace(/^\.\//, ''); // chunksName = isOnline ? chunksName.replace(/[.\d]*\/index/g, 'index') : chunksName;

  const _filename = isOnline ? _path.default.join('./html/build', file) : file; // console.log(path.join('./html/build', file), isOnline, chunksName);


  return new _htmlWebpackPlugin.default({
    version: tagVersion,
    inject: true,
    hash: true,
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
    filename: _filename,
    template: _path.default.resolve(file),
    chunks: [chunksName]
  });
}

function getPlugins({
  htmlEntry,
  env = 'local',
  cdnhost
}) {
  const jsHost = `${cdnhost || _utils.default.getUserConfig.cdnhost}/${_utils.default.getUserConfig.appName}/`;
  let config = [new _webpack.default.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }), //避免重复的模块
  // new webpack.optimize.DedupePlugin()

  /* 跳过编译时出错的代码并记录 , webpack.NoErrorsPlugin webpack4后改为webpack.NoEmitOnErrorsPlugin */
  new _webpack.default.NoEmitOnErrorsPlugin()];
  console.log('构建环境 NODE_ENV:', process.env.NODE_ENV);

  if (process.env.NODE_ENV == 'dev') {
    config.push(new _webpack.default.NamedModulesPlugin());
    config.push(new _webpack.default.HotModuleReplacementPlugin());
  }

  if (process.env.NODE_ENV != 'dev') {
    (env == 'local' || env == 'daily') && config.unshift(new _progressBarWebpackPlugin.default());
    config.push(new _cleanWebpackPlugin.CleanWebpackPlugin());
    config.push(new _bidLazyPathPlugin.default({
      version: tagVersion,
      jsHost
    }));

    if (typeof htmlEntry === 'string') {
      config.push(setHtmlPlugin(htmlEntry, env));
    } else if (Array.isArray(htmlEntry)) {
      htmlEntry.forEach(function (file) {
        config.push(setHtmlPlugin(file, env));
      });
    }

    config.push(new _htmlWebpackReplaceHost.default({
      replaceString: env == 'local' || env == 'daily' ? '' : jsHost,
      env: env
    }));
    config.push(new _webpackPluginInlineSource.default({
      env: env == 'local' || env == 'daily' ? 'development' : 'production'
    }));
  } else {
    config.push(new _friendlyErrorsWebpackPlugin.default());
  } // console.log(config);


  return config;
}

var _default = getPlugins;
exports.default = _default;
module.exports = exports.default;