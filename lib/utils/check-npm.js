"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var npm = require('npm');

var inspect = require('util').inspect;

var checkNpm = function checkNpm(name, cb) {
  // 检测NPM版本
  npm.load({
    loglevel: 'silent'
  }, function (err) {
    if (npm && npm.registry && npm.registry.log && npm.registry.log.level) {
      npm.registry.log.level = 'silent';
    }

    if (err) {
      return cb(err);
    }

    var silent = true;
    npm.commands.view([name], silent, function (err, data) {
      if (err) return cb(err);
      if (!data) return cb(new Error('No data received.')); // eslint-disable-next-line

      for (var p in data) {
        // eslint-disable-next-line
        if (!data.hasOwnProperty(p) || !semver.valid(p)) continue;
        return cb(null, p, data[p]);
      }

      return cb(new Error('Bad data received: ' + inspect(data)));
    });
  });
};

var _default = checkNpm;
exports["default"] = _default;
module.exports = exports.default;