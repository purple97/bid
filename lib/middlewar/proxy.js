"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _httpProxyMiddleware = require("http-proxy-middleware");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /*
 * @Author: dezhao.chen
 * @Date: 2020-07-30 16:21:28
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-07-31 11:29:43
 * @Description: file content
 */
/**
 * @description: 实现一个简易的代理, 用法参考webpack-dev-server;
 * @param {Objdect | Object[]}
 * @return: middleware[]
 */
var _default = options => {
  const middlewares = [];
  const proxy = options => {
    if (options.target) {
      return (0, _httpProxyMiddleware.createProxyMiddleware)(options.context, options);
    }
  };
  if (options.target) {
    middlewares.push(proxy(options));
  } else {
    Object.keys(options).forEach(match => {
      let config = _objectSpread(_objectSpread({}, options[match]), {}, {
        context: match
      });
      middlewares.push(proxy(config));
    });
  }
  if (Array.isArray(options)) {
    options.forEach(config => {
      middlewares.push(proxy(config));
    });
  }
  return middlewares;
};
exports.default = _default;
module.exports = exports.default;