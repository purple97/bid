"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _cliColor = _interopRequireDefault(require("cli-color"));

var _cheerio = _interopRequireDefault(require("cheerio"));

/*
 * @Author: dezhao.chen
 * @Date: 2020-04-18 17:06:56
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-07-16 16:08:49
 * @Description: 检测html中的js路径是否正确
 * @用法:
 * const checkPathInHtmlMiddlewar = require('./chack-path-in-html');
 * app.get('/index.html', checkPathInHtmlMiddlewar);
 */
var checkHtmlFilePath = function checkHtmlFilePath(filepath) {
  var isExist = true;
  var jssrc = filepath.replace('.html', '.js');
  jssrc = '@cdnhost' + jssrc.replace('index.js', '@version/index.js');

  var filedata = _fs["default"].readFileSync(_path["default"].join(process.cwd(), filepath), 'utf-8');

  var $ = _cheerio["default"].load(filedata);

  var Scripts = $("script[src=\"".concat(jssrc, "\"]"));

  if (Scripts.length <= 0) {
    isExist = false;
  }

  return isExist;
};

var ChackPathInHtml = function ChackPathInHtml(req, res, next) {
  if (checkHtmlFilePath(req.path)) {
    // res.render('.' + req.path, { htmlWebpackPlugin: null });
    next();
  } else {
    console.log(_cliColor["default"].red('index.js地址和html地址不匹配:' + req.path));
  }
};

var _default = ChackPathInHtml;
exports["default"] = _default;
module.exports = exports.default;