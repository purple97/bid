"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 *	生成webpack module.noParse 配置
 *	忽略查找出现在其中的js所引入的依赖
 */
const getNoParse = userNoParse => {
  let noParse = []; // 忽略查找出现在其中的js所引入的依赖
  if (userNoParse) {
    noParse = noParse.concat(userNoParse);
  }
  noParse.forEach(function (np, ind) {
    noParse[ind] = np.replace(/^@br\//, this.webpack.alias['@br']); // 替换@br别名
  });

  return noParse;
};
var _default = getNoParse;
exports.default = _default;
module.exports = exports.default;