"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _httpProxyMiddleware = require("http-proxy-middleware");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @description: 实现一个简易的代理, 用法参考webpack-dev-server;
 * @param {Objdect | Object[]}
 * @return: middleware[]
 */
var _default = function _default(options) {
  var middlewares = [];

  var proxy = function proxy(options) {
    if (options.target) {
      return (0, _httpProxyMiddleware.createProxyMiddleware)(options.context, options);
    }
  };

  if (options.target) {
    middlewares.push(proxy(options));
  } else {
    Object.keys(options).forEach(function (match) {
      var config = _objectSpread(_objectSpread({}, options[match]), {}, {
        context: match
      });

      middlewares.push(proxy(config));
    });
  }

  if (Array.isArray(options)) {
    options.forEach(function (config) {
      middlewares.push(proxy(config));
    });
  }

  return middlewares;
};

exports["default"] = _default;
module.exports = exports.default;