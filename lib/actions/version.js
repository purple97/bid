"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cliColor = _interopRequireDefault(require("cli-color"));

var _checkNpm = _interopRequireDefault(require("../utils/check-npm"));

var _default = function _default(userVersion) {
  console.log(_cliColor["default"].blue('正在检测远端版本...'));
  console.log(_cliColor["default"].green("\u5F53\u524D\u7248\u672C\u4E3A\uFF1A".concat(userVersion)));
  (0, _checkNpm["default"])('br-bid', function (err, version, moduleInfo) {
    if (err) {
      console.log(_cliColor["default"].red('检测失败...'));
      console.error(err);
      return;
    }

    console.log(_cliColor["default"].green("\u6700\u65B0\u7248\u672C\u4E3A\uFF1A".concat(moduleInfo['dist-tags'].latest)));

    if (moduleInfo['dist-tags'].latest != userVersion) {
      console.log(_cliColor["default"].yellow('当前版本不是最新，请手动更新...'));
    } else {
      console.log(_cliColor["default"].green('恭喜您，当前版本是最新版本.'));
    }
  });
};

exports["default"] = _default;
module.exports = exports.default;