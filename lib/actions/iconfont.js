"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fs = _interopRequireDefault(require("fs"));

var _cliColor = _interopRequireDefault(require("cli-color"));

var _commander = _interopRequireDefault(require("commander"));

var _promise = _interopRequireDefault(require("promise"));

var _urllib = _interopRequireDefault(require("urllib"));

// import co from 'co';
var IconfontToBase64 = /*#__PURE__*/function () {
  function IconfontToBase64() {
    (0, _classCallCheck2["default"])(this, IconfontToBase64);
    console.log(_cliColor["default"].blue('现在开始 iconfont ttf 转换 base64 ...'));
    this.action();
  }

  (0, _createClass2["default"])(IconfontToBase64, [{
    key: "parseUrl",
    value: function parseUrl(text) {
      var urlRegex = /(https?:?)?(\/\/at.alicdn.com\/t\/font_.*\.ttf)/;

      if (urlRegex.exec(text)) {
        return 'http:' + RegExp.$2;
      }

      return false;
    }
  }, {
    key: "parseLine",
    value: function parseLine(line) {
      var _this = this;

      return new _promise["default"](function (resolve, reject) {
        var template = '    src: url(data:font/truetype;charset=utf-8;base64,<>) format("truetype");';

        var url = _this.parseUrl(line);

        if (url) {
          _urllib["default"].request(url, function (err, data) {
            if (err) reject(err);
            var line = template.replace('<>', data.toString('base64'));
            resolve(line);
          });
        } else {
          resolve(line);
        }
      });
    }
  }, {
    key: "action",
    value: function () {
      var _action = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var input, output, fileContent, arr, i, line, str;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_commander["default"].args[0].input) {
                  input = _commander["default"].args[0].input;
                } else {
                  process.exit(1);
                }

                fileContent = _fs["default"].readFileSync(input).toString().split('\n');
                arr = [];
                i = 0;

              case 4:
                if (!(i < fileContent.length)) {
                  _context.next = 13;
                  break;
                }

                line = fileContent[i];
                _context.next = 8;
                return this.parseLine(line);

              case 8:
                str = _context.sent;
                arr.push(str);

              case 10:
                i++;
                _context.next = 4;
                break;

              case 13:
                // 有输出路径则写到对应文件，否则直接替换原文件
                if (_commander["default"].args[0].output) {
                  output = _commander["default"].args[0].output;

                  _fs["default"].writeFileSync(output, arr.join('\n'));

                  console.log(_cliColor["default"].green('替换完成！'));
                } else {
                  _fs["default"].writeFileSync(input, arr.join('\n'));

                  console.log(_cliColor["default"].yellow('没有指定输出路径，源文件替换完成！'));
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function action() {
        return _action.apply(this, arguments);
      }

      return action;
    }()
  }]);
  return IconfontToBase64;
}();

var _default = IconfontToBase64;
exports["default"] = _default;
module.exports = exports.default;