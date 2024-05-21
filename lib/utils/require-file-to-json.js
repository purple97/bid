"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
function RequireFileToJSON(filePath) {
  if (!_fs.default.existsSync(filePath)) {
    console.log(`不存在文件${filePath}`);
    return;
  }
  let fileContent = _fs.default.readFileSync(filePath).toString();
  let json = JSON.parse(fileContent);
  return json;
}
var _default = RequireFileToJSON;
exports.default = _default;
module.exports = exports.default;