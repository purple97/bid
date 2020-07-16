"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/*
 * @Author: dezhao.chen
 * @Date: 2020-04-18 17:10:19
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-07-16 16:08:15
 * @Description: 当开发环境请求带有@version的入口js时，重定向到移除@version/的路径
 */
function _default(req, res, next) {
  if (/\/@cdnhost[\s\S]+@version/g.test(req.path)) {
    var filePath = req.path.replace(/\/@cdnhost[\s\S]+@version/g, '');
    res.redirect(filePath);
    return;
  }

  next();
}

module.exports = exports.default;