"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CompareVersion", {
  enumerable: true,
  get: function () {
    return _compareVersion.default;
  }
});
Object.defineProperty(exports, "IconfontToBase64", {
  enumerable: true,
  get: function () {
    return _iconfont.default;
  }
});
Object.defineProperty(exports, "InitProject", {
  enumerable: true,
  get: function () {
    return _init.default;
  }
});
Object.defineProperty(exports, "LessToCss", {
  enumerable: true,
  get: function () {
    return _lessToCss.default;
  }
});
Object.defineProperty(exports, "Lint", {
  enumerable: true,
  get: function () {
    return _lint.default;
  }
});
Object.defineProperty(exports, "Utils", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "Version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});
Object.defineProperty(exports, "WebpackDevConfig", {
  enumerable: true,
  get: function () {
    return _webpackDev.default;
  }
});
Object.defineProperty(exports, "WebpackMerge", {
  enumerable: true,
  get: function () {
    return _webpackMerge.merge;
  }
});
Object.defineProperty(exports, "WebpackProConfig", {
  enumerable: true,
  get: function () {
    return _webpackPro.default;
  }
});
Object.defineProperty(exports, "WebpackTestConfig", {
  enumerable: true,
  get: function () {
    return _webpackTest.default;
  }
});
Object.defineProperty(exports, "getIp", {
  enumerable: true,
  get: function () {
    return _getip.default;
  }
});
Object.defineProperty(exports, "mergeWithCustomize", {
  enumerable: true,
  get: function () {
    return _webpackMerge.mergeWithCustomize;
  }
});
Object.defineProperty(exports, "mergeWithRules", {
  enumerable: true,
  get: function () {
    return _webpackMerge.mergeWithRules;
  }
});
Object.defineProperty(exports, "middlewar", {
  enumerable: true,
  get: function () {
    return _index2.default;
  }
});
Object.defineProperty(exports, "unique", {
  enumerable: true,
  get: function () {
    return _webpackMerge.unique;
  }
});
var _index = _interopRequireDefault(require("./utils/index"));
var _getip = _interopRequireDefault(require("./utils/getip"));
var _lint = _interopRequireDefault(require("./actions/lint"));
var _version = _interopRequireDefault(require("./actions/version"));
var _init = _interopRequireDefault(require("./actions/init"));
var _index2 = _interopRequireDefault(require("./middlewar/index"));
var _lessToCss = _interopRequireDefault(require("./actions/less-to-css"));
var _iconfont = _interopRequireDefault(require("./actions/iconfont"));
var _compareVersion = _interopRequireDefault(require("./utils/compare-version"));
var _webpackPro = _interopRequireDefault(require("./webpack/webpack.pro.config"));
var _webpackDev = _interopRequireDefault(require("./webpack/webpack.dev.config"));
var _webpackTest = _interopRequireDefault(require("./webpack/webpack.test.config"));
var _webpackMerge = require("webpack-merge");
/*
 * @author:dezhao.chen
 * @Email:10949221@qq.com
 * 工具库、webpack基础配置、bid工具Express中间件
 * 未经本人允许禁止商业用途
 */
const {
  name,
  version
} = require('../package.json');
console.log(`${name} version:${version}`);