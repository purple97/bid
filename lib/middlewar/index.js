"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getCatalog = _interopRequireDefault(require("./get-catalog"));

var _cssFile = _interopRequireDefault(require("./css-file"));

var _chackPathInHtml = _interopRequireDefault(require("./chack-path-in-html"));

var _redirectJs = _interopRequireDefault(require("./redirect-js"));

var _proxy = _interopRequireDefault(require("./proxy"));

var _default = {
  Proxy: _proxy.default,
  CssFile: _cssFile.default,
  Redirect: _redirectJs.default,
  GetCatalog: _getCatalog.default,
  CheckPathInHtml: _chackPathInHtml.default
};
exports.default = _default;
module.exports = exports.default;