"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var getAlias = function getAlias(userAlias) {
  /*
   *	生成webpack resolve.alias 别名配置
   */
  var alias = {
    // 别名
    '@br': _path["default"].join(process.cwd(), './src/c/')
  }; // eslint-disable-next-line

  for (var aliasName in userAlias) {
    userAlias[aliasName] = userAlias[aliasName].replace(/^@br\//, alias['@br']); // 将别名配置中的@br替换为'src/c'目录
  }

  alias = Object.assign(alias, userAlias);
  return alias;
};

var _default = getAlias;
exports["default"] = _default;
module.exports = exports.default;