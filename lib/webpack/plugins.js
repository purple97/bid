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

/*  */
const tagVersion = _utils.default.getUserConfig.version;

function setHtmlPlugin(file, env) {
  const isOnline = ['tag', 'productionNoTag', 'production-build', 'production', 'gray'].indexOf(env) !== -1;
  return new _htmlWebpackPlugin.default({
    version: tagVersion,
    inject: true,
    hash: true,
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
    meta: {
      env: env,
      'update-time': {
        'update-time': new Date().toLocaleString()
      }
    },
    path: _path.default.resolve(process.cwd(), './deploy', isOnline ? './html/build' : './build'),
    filename: file,
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
  }), //避免重复的模块
  // new webpack.optimize.DedupePlugin(),

  /* 跳过编译时出错的代码并记录 , webpack.NoErrorsPlugin webpack4后改为webpack.NoEmitOnErrorsPlugin */
  new _webpack.default.NoEmitOnErrorsPlugin()];

  if (env == 'local' || env == 'daily' || env == 'production-build') {
    config.push(new _webpack.default.ProgressPlugin({
      percentBy: 'entries'
    })); // config.push(new LazyPathPlugin({ version: tagVersion, jsHost, env }))

    config.push(setHtmlPlugin(htmlEntry, env)); // console.log(jsPath)

    config.push(new _htmlWebpackReplaceHost.default({
      replaceString: env == 'local' || env == 'daily' ? '' : jsPath
    }));
    config.push(new _webpackPluginInlineSource.default({
      loaders: _htmlInlineSourceLoaders.default
    }));
  } else {// config.push(new webpack.NamedModulesPlugin())
    // config.push(new FriendlyErrorsPlugin())
  } // console.log(config);


  return config;
}

var _default = getPlugins;
exports.default = _default;
module.exports = exports.default;