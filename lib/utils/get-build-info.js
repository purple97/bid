"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.autoGetHtml = exports.autoGetEntry = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

const htmlre = new RegExp(/\/index\.(htm|html)$/);
const jsre = new RegExp(/\/index\.(js|jsx|ts|tsx)$/);

function insetVersionByJS(pathname, version) {
  let v = version ? "/" + version : '';
  return pathname.replace(jsre, `${v}/index`);
}

function insetVersionByHTML(pathname, version) {
  let v = version ? "/" + version : '';
  return pathname.replace(htmlre, `${v}/index.$1`);
}

const autoGetEntry = (version, devFilePath) => {
  // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
  let entry = {};

  let isInit = _fs.default.existsSync(devFilePath);

  let getJsEntry = dir => {
    _fs.default.readdirSync(dir).forEach(file => {
      let pathname = _path.default.join(dir, file);

      if (_fs.default.statSync(pathname).isDirectory()) {
        getJsEntry(pathname);
      } else if (jsre.test(pathname)) {
        let relFileName = './src/' + pathname.split('/src/')[1]; // let v = version ? version + '/' : '';
        // let relFileKey = 'src/' + pathname.split('/src/')[1].split('index.js')[0] + v + 'index';

        const relFileKey = insetVersionByJS(pathname, version);
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

const autoGetHtml = (version, devFilePath) => {
  // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
  let html = {
    keys: [],
    jsEntry: {},
    originList: []
  };

  let isInit = _fs.default.existsSync(devFilePath);

  let getJsHtml = dir => {
    // 递归遍历约定的目录结构，设置jsEntry配置
    _fs.default.readdirSync(dir).forEach(file => {
      let pathname = _path.default.join(dir, file);

      if (_fs.default.statSync(pathname).isDirectory()) {
        getJsHtml(pathname);
      } else if (htmlre.test(pathname)) {
        let relFileName = './src/' + pathname.split('/src/')[1];
        html.originList.push(relFileName);
        let v = version ? version + '/' : '';
        let relFileKey = 'src/' + pathname.split('/src/')[1].split('index.html')[0] + v + 'index';
        let tmpJS = relFileName.replace(htmlre, '');

        let exists = _fs.default.existsSync(_path.default.join(process.cwd(), tmpJS));

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

const getBuildInfo = version => {
  let devFilePath = _path.default.join(process.cwd(), './src/p');

  return {
    autoGetEntry: autoGetEntry(version, devFilePath),
    autoGetHtml: autoGetHtml(version, devFilePath)
  };
};

var _default = getBuildInfo;
exports.default = _default;