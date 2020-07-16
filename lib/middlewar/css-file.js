"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lessMiddleware = _interopRequireDefault(require("less-middleware"));

/**
 * @fileOverview
 * @author dezhao
 */
// let path = require('path');
var _default = (0, _lessMiddleware["default"])(process.cwd(), {
  preprocess: {
    path: function path(pathname) {
      var _path = pathname;

      if (_path.indexOf('/build') != -1) {
        _path = pathname.replace(/build/, 'src');
      }

      return _path;
    }
  },
  //dest: path.join(process.cwd()),
  debug: true
});

exports["default"] = _default;
module.exports = exports.default;