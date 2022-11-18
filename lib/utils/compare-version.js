"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
比较两个版本号version1和version2。
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