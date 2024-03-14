"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getExternals = getExternals;
var _utils = _interopRequireDefault(require("../utils/"));
function getExternals(env) {
  const {
    externals,
    devExternals
  } = _utils.default.getUserConfig;
  if (env !== 'local') return externals || {};
  return devExternals ? devExternals : externals || {};
}
var _default = exports.default = _utils.default.getUserConfig.externals || {};