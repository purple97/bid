"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _cliColor = _interopRequireDefault(require("cli-color"));
var _commander = _interopRequireDefault(require("commander"));
var _promise = _interopRequireDefault(require("promise"));
var _urllib = _interopRequireDefault(require("urllib"));
// import co from 'co';

class IconfontToBase64 {
  constructor() {
    console.log(_cliColor.default.blue('现在开始 iconfont ttf 转换 base64 ...'));
    this.action();
  }
  parseUrl(text) {
    let urlRegex = /(https?:?)?(\/\/at.alicdn.com\/t\/font_.*\.ttf)/;
    if (urlRegex.exec(text)) {
      return 'http:' + RegExp.$2;
    }
    return false;
  }
  parseLine(line) {
    return new _promise.default((resolve, reject) => {
      let template = '    src: url(data:font/truetype;charset=utf-8;base64,<>) format("truetype");';
      let url = this.parseUrl(line);
      if (url) {
        _urllib.default.request(url, (err, data) => {
          if (err) reject(err);
          let line = template.replace('<>', data.toString('base64'));
          resolve(line);
        });
      } else {
        resolve(line);
      }
    });
  }
  async action() {
    let input, output;
    if (_commander.default.args[0].input) {
      input = _commander.default.args[0].input;
    } else {
      process.exit(1);
    }
    let fileContent = _fs.default.readFileSync(input).toString().split('\n');
    let arr = [];
    for (let i = 0; i < fileContent.length; i++) {
      let line = fileContent[i];
      let str = await this.parseLine(line);
      arr.push(str);
    }

    // 有输出路径则写到对应文件，否则直接替换原文件
    if (_commander.default.args[0].output) {
      output = _commander.default.args[0].output;
      _fs.default.writeFileSync(output, arr.join('\n'));
      console.log(_cliColor.default.green('替换完成！'));
    } else {
      _fs.default.writeFileSync(input, arr.join('\n'));
      console.log(_cliColor.default.yellow('没有指定输出路径，源文件替换完成！'));
    }
  }
}
var _default = IconfontToBase64;
exports.default = _default;
module.exports = exports.default;