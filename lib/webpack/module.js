"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = _interopRequireDefault(require("../utils/"));

function _default() {
  return {
    rules: require('./getBabelConfig')(_utils.default.getUserConfig),
    //不在扫正则所匹配的模块的依赖
    noParse: function (content) {
      const pass = /(lodash|zepto|jquery)\.js/.test(content);
      return pass;
    }
  };
}

module.exports = exports.default;