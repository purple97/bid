"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = _interopRequireDefault(require("../utils/"));

var _lessVariableInjection = _interopRequireDefault(require("less-variable-injection"));

var dirSrc = _path["default"].join(process.cwd(), 'src');

var dirNodeModule = /node_modules/;

var _default = function _default() {
  var configJson = _utils["default"].getUserConfig; // const isOnline = env == 'production';

  var jsx, tsx, ejs, less, css, json, file;
  var babelOptions = {
    babelrc: false,
    cwd: _path["default"].resolve(_utils["default"].path.parentDir, 'node_modules'),
    presets: [['@babel/preset-env', {
      modules: 'commonjs'
    }], '@babel/preset-react'],
    plugins: [['babel-plugin-react-scoped-css', {
      include: '.scoped.(le|c)ss$'
    }], '@babel/plugin-transform-runtime', ['@babel/plugin-proposal-decorators', {
      legacy: true
    }], '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', 'babel-plugin-add-module-exports', ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }]],
    cacheDirectory: true
  };
  jsx = {
    test: /\.(js|jsx)$/,
    include: [dirSrc, /@bairong\//],
    // exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: babelOptions
    }
  };
  tsx = {
    test: /\.(ts|tsx)$/,
    include: [dirSrc, /@bairong\//],
    // exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      options: babelOptions
    }, {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true
      }
    }]
  };
  ejs = {
    test: /\.ejs$/,
    // exclude: path.resolve(Utils.path.cwdPath, 'node_modules'),
    use: [{
      loader: 'babel-loader',
      options: {
        cwd: _path["default"].resolve(_utils["default"].path.parentDir, 'node_modules')
      }
    }, {
      loader: 'ejs-loader?variable=data'
    }]
  };
  less = {
    test: /\.less$/,
    include: [dirSrc, dirNodeModule],
    // exclude: /node_modules/,
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    }, {
      loader: 'scoped-css-loader'
    }, {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }]
  };
  css = {
    test: /\.css$/,
    include: [dirSrc, dirNodeModule],
    // exclude: /node_modules/,
    use: ['style-loader', {
      loader: 'css-loader',
      options: {
        modules: false
      }
    }, {
      loader: 'scoped-css-loader'
    }]
  };
  json = {
    test: /\.json$/,
    exclude: /node_modules/,
    use: {
      loader: 'json-loader'
    }
  };
  file = {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: {
      loader: 'file-loader'
    }
  };

  if (configJson.theme) {
    if (!less.use[2].options) {
      less.use[2].options = {};
    }

    if (!less.use[2].options.plugins) {
      less.use[2].options.plugins = [];
    }

    less.use[2].options.plugins.push(new _lessVariableInjection["default"](configJson.theme));
  }

  return [jsx, tsx, ejs, less, css, json, file];
};

exports["default"] = _default;
module.exports = exports.default;