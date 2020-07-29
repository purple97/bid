"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = _interopRequireDefault(require("../utils/"));

var alias = _utils["default"].webpack.alias;
var _default = {
  modules: [_path["default"].join(_utils["default"].path.cwdPath, 'src'), _path["default"].join(_utils["default"].path.cwdPath, 'node_modules'), _path["default"].join(_utils["default"].path.rootPath, 'node_modules')],
  //require时候自动补全扩展名;
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.less', '.css'],
  alias: alias // 别名

};
exports["default"] = _default;
module.exports = exports.default;