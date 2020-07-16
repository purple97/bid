"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path2 = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("../utils/index"));

var style = '';
var rem = '';
style = _fs["default"].readFileSync(_path2["default"].resolve(__dirname, '../../public/body_style.css'), 'utf-8');
rem = _fs["default"].readFileSync(_path2["default"].resolve(__dirname, '../../public/rem.js'), 'utf-8');
var mata = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no\"/>\n            <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"/>\n            <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"/>\n            <meta name=\"format-detection\" content=\"telephone=no\"/>";

if (style) {
  style = mata + '<style>' + style + '</style>';
}

if (rem) {
  rem = '<script type="text/javascript">' + rem + '</script>';
  style += rem;
}

var FilterPath = [/^\./, /node_modules/];

function GetCatalog(req, res, next) {
  var _path = req.path;

  var _html = style + '<ul><li><a href="../">...</a></li>';

  var re = /.[a-zA-Z0-9_]+$/;

  if (!_path.match(re)) {
    _fs["default"].readdir(_path2["default"].join(_index["default"].path.cwdPath, _path), function (err, files) {
      if (err) {
        console.log('readdir error');
        console.log(err);
        res.send(err);
      } else {
        var _files = FilterFilesArray(files, FilterPath);

        _files.forEach(function (item) {
          var tmpPath = _path + item;
          var itemType = 'file';
          _html += '<li><a data-fileType="' + itemType + '" href="' + tmpPath + '">' + item + '</a></li>';
        });

        _html += '</ul>';
        res.send(_html);
      }
    });
  } else {
    next();
  }
}

function FilterFilesArray(files, filters) {
  var _files = [];
  files.forEach(function (item) {
    var needFilter = false;
    filters.forEach(function (filter) {
      if (item.match(filter)) {
        needFilter = true;
      }
    });

    if (!needFilter) {
      _files.push(item);
    }
  });
  return _files;
}

var _default = GetCatalog;
exports["default"] = _default;
module.exports = exports.default;