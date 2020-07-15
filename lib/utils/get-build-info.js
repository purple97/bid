"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.autoGetHtml = exports.autoGetEntry = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var autoGetEntry = function autoGetEntry(version, devFilePath) {
  // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
  var entry = {};

  var isInit = _fs["default"].existsSync(devFilePath);

  var getJsEntry = function getJsEntry(dir) {
    _fs["default"].readdirSync(dir).forEach(function (file) {
      var pathname = _path["default"].join(dir, file);

      if (_fs["default"].statSync(pathname).isDirectory()) {
        getJsEntry(pathname);
      } else if (/index\.js$/.test(pathname)) {
        var relFileName = './src/' + pathname.split('/src/')[1];
        var v = version ? version + '/' : '';
        var relFileKey = 'src/' + pathname.split('/src/')[1].split('index.js')[0] + v + 'index';
        entry[relFileKey] = relFileName;
      }
    });

    return entry;
  };

  if (isInit) {
    return getJsEntry(devFilePath);
  } else {
    return {};
  }
};

exports.autoGetEntry = autoGetEntry;

var autoGetHtml = function autoGetHtml(version, devFilePath) {
  // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
  var html = {
    keys: [],
    jsEntry: {},
    originList: []
  };

  var isInit = _fs["default"].existsSync(devFilePath);

  var getJsHtml = function getJsHtml(dir) {
    // 递归遍历约定的目录结构，设置jsEntry配置
    _fs["default"].readdirSync(dir).forEach(function (file) {
      var pathname = _path["default"].join(dir, file);

      if (_fs["default"].statSync(pathname).isDirectory()) {
        getJsHtml(pathname);
      } else if (/index\.html$/.test(pathname)) {
        var relFileName = './src/' + pathname.split('/src/')[1];
        html.originList.push(relFileName);
        var v = version ? version + '/' : '';
        var relFileKey = 'src/' + pathname.split('/src/')[1].split('index.html')[0] + v + 'index';
        var tmpJS = relFileName.replace(/\.html$/g, '.js');

        var exists = _fs["default"].existsSync(_path["default"].join(process.cwd(), tmpJS));

        if (exists) {
          html.jsEntry[relFileKey] = tmpJS;
        } else {
          html.jsEntry[relFileKey] = false;
        }

        html.keys.push(relFileKey);
      }
    });
  };

  if (isInit) {
    // 如果该项目路径已经进行了bid init初始化(拥有约定目录结构)
    getJsHtml(devFilePath);
    return html;
  } else {
    return {};
  }
};

exports.autoGetHtml = autoGetHtml;

var getBuildInfo = function getBuildInfo(version) {
  var devFilePath = _path["default"].join(process.cwd(), './src/p');

  return {
    autoGetEntry: autoGetEntry(version, devFilePath),
    autoGetHtml: autoGetHtml(version, devFilePath)
  };
};

var _default = getBuildInfo;
exports["default"] = _default;