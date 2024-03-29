"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cliColor = _interopRequireDefault(require("cli-color"));

var _checkNpm = _interopRequireDefault(require("../utils/check-npm"));

// import { version } from '../../package.json'

/*
 * 检测核心基础库版本号是否最新
 */
var _default = version => {
  const name = '@bairong/br-bid';
  const appVersion = version || '2.0.5';
  console.log(_cliColor.default.blue('正在检测远端版本...')); // console.log(colors.green(`${name}当前版本为：${appVersion}`))

  (0, _checkNpm.default)(name, function (err, version, moduleInfo) {
    if (err) {
      console.log(_cliColor.default.red('检测失败...'));
      console.error(err);
      return;
    }

    console.log(_cliColor.default.green(`最新版本为：${moduleInfo['dist-tags'].latest}`));

    if (moduleInfo['dist-tags'].latest != appVersion) {
      console.log(_cliColor.default.yellow('当前版本不是最新，请手动更新...'));
    } else {
      console.log(_cliColor.default.green('恭喜您，当前版本是最新版本.'));
    }
  });
};

exports.default = _default;
module.exports = exports.default;