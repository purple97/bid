"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _cliColor = _interopRequireDefault(require("cli-color"));
var _projectGenerator = _interopRequireDefault(require("../utils/project-generator"));
function InitProject(cmd, {
  projectDir,
  examplesDir
}) {
  let dirname = projectDir || _path.default.join(process.cwd(), './');
  let initTime = new Date().getTime();
  console.log(projectDir, examplesDir);
  const args = cmd.parent.rawArgs[cmd.parent.rawArgs.length - 1];
  const isReact = args == '-r' || args == '--react';
  console.log(_cliColor.default.green('正在初始化工程目录ing4...'), _cliColor.default.green(`${isReact ? 'react' : '普通'}工程`));
  (0, _projectGenerator.default)({
    dirname: dirname,
    examplesDir: examplesDir,
    react: isReact
  }, error => {
    // 初始化常规工程
    let nowTime = new Date().getTime();
    if (!error) {
      console.log(_cliColor.default.green('依赖文件拷贝完成!'), _cliColor.default.blue('共耗时:' + (nowTime - initTime) / 1000, 's'));
    } else {
      console.log(_cliColor.default.red('拷贝依赖文件失败!'), _cliColor.default.blue('共耗时:' + (nowTime - initTime) / 1000, 's'));
    }
  });
}
var _default = exports.default = InitProject;
module.exports = exports.default;