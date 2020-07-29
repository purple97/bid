"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _cliColor = _interopRequireDefault(require("cli-color"));

var _projectGenerator = _interopRequireDefault(require("../utils/project-generator"));

function InitProject(cmd, _ref) {
  var projectDir = _ref.projectDir,
      examplesDir = _ref.examplesDir;

  var dirname = projectDir || _path["default"].join(process.cwd(), './');

  var initTime = new Date().getTime();
  console.log(projectDir, examplesDir);
  var args = cmd.parent.rawArgs[cmd.parent.rawArgs.length - 1];
  var isReact = args == '-r' || args == '--react';
  console.log(_cliColor["default"].green('正在初始化工程目录ing4...'), _cliColor["default"].green("".concat(isReact ? 'react' : '普通', "\u5DE5\u7A0B")));
  (0, _projectGenerator["default"])({
    dirname: dirname,
    examplesDir: examplesDir,
    react: isReact
  }, function (error) {
    // 初始化常规工程
    var nowTime = new Date().getTime();

    if (!error) {
      console.log(_cliColor["default"].green('依赖文件拷贝完成!'), _cliColor["default"].blue('共耗时:' + (nowTime - initTime) / 1000, 's'));
    } else {
      console.log(_cliColor["default"].red('拷贝依赖文件失败!'), _cliColor["default"].blue('共耗时:' + (nowTime - initTime) / 1000, 's'));
    }
  });
}

var _default = InitProject;
exports["default"] = _default;
module.exports = exports.default;