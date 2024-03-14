"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _npm = _interopRequireDefault(require("npm"));
var _semver = _interopRequireDefault(require("semver"));
var _util = require("util");
const args = '--registry=http://registry.shurongdai.cn/';
const checkNpm = (name, cb) => {
  // 检测NPM版本
  _npm.default.load({
    loglevel: 'silent'
  }, err => {
    if (_npm.default && _npm.default.registry && _npm.default.registry.log && _npm.default.registry.log.level) {
      _npm.default.registry.log.level = 'silent';
    }
    if (err) {
      return cb(err);
    }
    let silent = true;
    _npm.default.commands.view([name, args], silent, (err, data) => {
      if (err) return cb(err);
      if (!data) return cb(new Error('No data received.'));
      // eslint-disable-next-line
      for (let p in data) {
        // eslint-disable-next-line
        if (!data.hasOwnProperty(p) || !_semver.default.valid(p)) continue;
        return cb(null, p, data[p]);
      }
      return cb(new Error('Bad data received: ' + (0, _util.inspect)(data)));
    });
  });
};
var _default = exports.default = checkNpm;
module.exports = exports.default;