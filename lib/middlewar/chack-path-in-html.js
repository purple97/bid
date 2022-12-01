"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
const checkHtmlFilePath = filepath => {
  let isExist = true;
  let jssrc = filepath.replace('.html', '.js');
  jssrc = '@cdnhost' + jssrc.replace('index.js', '@version/index.js');

  let filedata = _fs.default.readFileSync(_path.default.join(process.cwd(), filepath), 'utf-8');

  let $ = _cheerio.default.load(filedata);

  let Scripts = $(`script[src="${jssrc}"]`);

  if (Scripts.length <= 0) {
    isExist = false;
  }

  return isExist;
};

const ChackPathInHtml = (req, res, next) => {
  if (checkHtmlFilePath(req.path)) {
    // res.render('.' + req.path, { htmlWebpackPlugin: null });
    next();
  } else {
    console.log(_cliColor.default.red('index.js地址和html地址不匹配:' + req.path));
  }
};

var _default = ChackPathInHtml;
exports.default = _default;
module.exports = exports.default;