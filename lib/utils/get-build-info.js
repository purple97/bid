"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.autoGetHtml = exports.autoGetEntry = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
const htmlre = new RegExp(/index\.(htm|html)$/);
const jsre = new RegExp(/index\.(js|jsx|ts|tsx)$/);
const rx_src = new RegExp(/[\/\\]src[\/|\\]/);
function insetVersionByJS(pathname, version) {
  let v = version ? version : '';
  return pathname.replace(jsre, `${v}/index`);
}
function insetVersionByHTML(pathname, version) {
  let v = version ? version : '';
  return pathname.replace(htmlre, `${v}/index`);
}
const autoGetEntry = (version, devFilePath) => {
  // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
  let entry = {};
  let getJsEntry = dir => {
    _fs.default.readdirSync(dir).forEach(file => {
      let pathname = _path.default.join(dir, file);
      if (_fs.default.statSync(pathname).isDirectory()) {
        getJsEntry(pathname);
      } else if (jsre.test(pathname)) {
        let relFileName = _path.default.join(`.${_path.default.sep}src${_path.default.sep}`, pathname.split(rx_src)[1]);
        const relFileKey = insetVersionByJS(relFileName, version);
        entry[relFileKey] = '.' + _path.default.sep + relFileName;
      }
    });
    return entry;
  };
  return getJsEntry(devFilePath);
};
exports.autoGetEntry = autoGetEntry;
const autoGetHtml = (version, devFilePath) => {
  // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
  let html = {
    keys: [],
    jsEntry: {},
    originList: []
  };
  let getJsHtml = dir => {
    // 递归遍历约定的目录结构，设置jsEntry配置
    _fs.default.readdirSync(dir).forEach(file => {
      let pathname = _path.default.join(dir, file);
      if (_fs.default.statSync(pathname).isDirectory()) {
        getJsHtml(pathname);
      } else if (htmlre.test(pathname)) {
        let relFileName = _path.default.join(`.${_path.default.sep}src${_path.default.sep}`, pathname.split(rx_src)[1]);
        html.originList.push(`.${_path.default.sep}${relFileName}`);
        let relFileKey = insetVersionByHTML(relFileName, version);
        const relFileKeyPaths = relFileKey.split(_path.default.sep);
        relFileKey = _path.default.join(_path.default.dirname(_path.default.join(...relFileKeyPaths)), './index');
        let tmpJS = _path.default.join(_path.default.dirname(relFileName), './index');
        html.jsEntry[relFileKey] = `.${_path.default.sep}${tmpJS}`;
        html.keys.push(relFileKey);
      }
    });
  };
  getJsHtml(devFilePath);
  return html;
};
exports.autoGetHtml = autoGetHtml;
const getBuildInfo = version => {
  let devFilePath = _path.default.join(process.cwd(), './src/p');
  let isInit = _fs.default.existsSync(devFilePath);
  if (isInit) {
    return {
      autoGetEntry: autoGetEntry(version, devFilePath),
      autoGetHtml: autoGetHtml(version, devFilePath)
    };
  } else {
    return {
      autoGetEntry: {},
      autoGetHtml: {}
    };
  }
};
var _default = getBuildInfo;
exports.default = _default;