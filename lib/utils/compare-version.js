"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* 
比较两个版本号version1和version2。
如果version1>version2返回1，如果version1<version2返回 -1， 除此之外返回 0。
你可以假设版本字符串非空，并且只包含数字和.字符。
.字符不代表小数点，而是用于分隔数字序列。
例如，2.5 不是“两个半”，也不是“差一半到三”，而是第二版中的第五个小版本。
你可以假设版本号的每一级的默认修订版号为 0。例如，版本号 3.4 的第一级（大版本）和第二级（小版本）修订号分别为 3 和 4。其第三级和第四级修订号均为 0。
来源：力扣（LeetCode）
*/

/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
const compareVersion = function (version1, version2) {
  let vers1 = version1.split('.'),
      vers2 = version2.split('.');
  const long = vers1.length >= vers2.length ? vers1.length : vers2.length;

  for (let i = 0; i < long; i++) {
    const res = parseInt(vers1[i] || 0) - parseInt(vers2[i] || 0);
    if (res == 0) continue;
    if (res > 0) return 1;
    if (res < 0) return -1;
  }

  return 0;
};

var _default = compareVersion;
exports.default = _default;
module.exports = exports.default;