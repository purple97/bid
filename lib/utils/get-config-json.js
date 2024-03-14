"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _cliColor = _interopRequireDefault(require("cli-color"));
/*
 *	读取工程根目录下的config.json
 */

const getUserConfig = fileName => {
  const _fileName = fileName || 'config.json';
  const configPath = _path.default.join(process.cwd(), _fileName);
  let configJSON = {};
  try {
    configJSON = _fs.default.existsSync(configPath) ? JSON.parse(_fs.default.readFileSync(configPath, 'utf8')) : configPath;
  } catch (e) {
    console.log(_cliColor.default.red('解析"config.json"时出错。'));
    process.exit(1);
  }
  return configJSON;
};
var _default = exports.default = getUserConfig;
module.exports = exports.default;