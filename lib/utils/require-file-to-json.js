"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

function RequireFileToJSON(filePath) {
  if (!_fs["default"].existsSync(filePath)) {
    console.log("\u4E0D\u5B58\u5728\u6587\u4EF6".concat(filePath));
    return;
  }

  var fileContent = _fs["default"].readFileSync(filePath).toString();

  var json = JSON.parse(fileContent);
  return json;
}

var _default = RequireFileToJSON;
exports["default"] = _default;
module.exports = exports.default;