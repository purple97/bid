"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../utils/"));

var _default = _utils.default.getUserConfig.externals || {};

exports.default = _default;
module.exports = exports.default;