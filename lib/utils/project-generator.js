"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _cliColor = _interopRequireDefault(require("cli-color"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
const projectGenerator = (args, callback) => {
  const dirname = args.dirname;
  const examplesDir = args.examplesDir;
  let targetPath = '';
  const commonFilePath = _path.default.join(examplesDir, './commonFiles');
  if (!args.react) {
    targetPath = _path.default.join(examplesDir, './normal');
  } else {
    targetPath = _path.default.join(examplesDir, './react');
  }
  if (!dirname) {
    console.log(_cliColor.default.red(`${dirname}目录不存在，初始化终止...`));
    process.exit(1);
  }
  _fs.default.exists(_path.default.join(dirname, './src'), exists => {
    if (exists) {
      console.log(_cliColor.default.yellow(`${_path.default.join(dirname, './src')}目录已存在，初始化终止...`));
      process.exit(1);
    }
    _fsExtra.default.copy(targetPath, dirname, {}, () => {
      console.log(_cliColor.default.green('目录结构创建成功！'));
      if (typeof callback == 'function') {
        callback();
      }
    });
    _fsExtra.default.copy(commonFilePath, dirname, {}, () => {
      console.log(_cliColor.default.green('配置文件创建成功！'));
    });
  });
};
var _default = projectGenerator;
exports.default = _default;
module.exports = exports.default;