"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _cliColor = _interopRequireDefault(require("cli-color"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var projectGenerator = function projectGenerator(args, callback) {
  var dirname = args.dirname;
  var targetPath = '';

  var commonFilePath = _path["default"].join(_path["default"].join(__dirname, '..'), 'examples/commonFiles');

  if (!args.react) {
    targetPath = _path["default"].join(_path["default"].join(__dirname, '..'), 'examples/normal');
  } else {
    targetPath = _path["default"].join(_path["default"].join(__dirname, '..'), 'examples/react');
  }

  if (!dirname) {
    console.log(_cliColor["default"].red("".concat(dirname, "\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u521D\u59CB\u5316\u7EC8\u6B62...")));
    process.exit(1);
  }

  _fs["default"].exists(_path["default"].join(dirname, './src'), function (exists) {
    if (exists) {
      console.log(_cliColor["default"].yellow("".concat(_path["default"].join(dirname, './src'), "\u76EE\u5F55\u5DF2\u5B58\u5728\uFF0C\u521D\u59CB\u5316\u7EC8\u6B62...")));
      process.exit(1);
    }

    _fsExtra["default"].copy(targetPath, dirname, {}, function () {
      console.log(_cliColor["default"].green('目录结构创建成功！'));

      if (typeof callback == 'function') {
        callback();
      }
    });

    _fsExtra["default"].copy(commonFilePath, dirname, {}, function () {
      console.log(_cliColor["default"].green('配置文件创建成功！'));
    });
  });
};

var _default = projectGenerator;
exports["default"] = _default;