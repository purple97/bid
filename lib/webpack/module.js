"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = _interopRequireDefault(require("../utils/"));

var _getRules = _interopRequireDefault(require("./getRules"));

function _default() {
  return {
    rules: (0, _getRules.default)(_utils.default.getUserConfig)
  };
}

module.exports = exports.default;