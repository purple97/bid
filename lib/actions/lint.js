"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _wideAlign = _interopRequireDefault(require("wide-align"));

var _cliColor = _interopRequireDefault(require("cli-color"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _eslint = require("eslint");

var _getConfigJson = _interopRequireDefault(require("../utils/get-config-json"));

var _getBuildInfo = _interopRequireDefault(require("../utils/get-build-info"));

/* 
    代码检测
*/
var printMessage = function printMessage(results) {
  var errorCount = 0;
  var warningCount = 0;
  results.forEach(function (res) {
    if (res.errorCount != 0) {
      console.log('\n', res.filePath);
      errorCount += res.errorCount;
      warningCount += res.warningCount;
      console.group();
      res.messages.forEach(function (mgs) {
        console.info(_cliColor["default"].red(_wideAlign["default"].center(mgs.line + ':' + mgs.column, 9)), _wideAlign["default"].left(mgs.message, 64), _cliColor["default"].cyan(_wideAlign["default"].left(mgs.ruleId, 16)));
      });
      console.groupEnd();
    }
  });
  console.log('\n ===========================================================================');

  if (errorCount || warningCount) {
    console.info(_cliColor["default"].red(errorCount + '处错误，' + warningCount + '处警告'));
  } else {
    console.info(_cliColor["default"].yellow('未检测到代码错误，非常棒~ '));
  }
};

var runLint = function runLint(dirPaths) {
  var cli = new _eslint.CLIEngine();
  var report = cli.executeOnFiles(dirPaths);
  printMessage(report.results);
};

var Lint = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var USERCONFIG, BUILDINFOS, answers, dirPaths;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(_cliColor["default"].green('开始代码检测')); // let deployJSON = null;

            USERCONFIG = (0, _getConfigJson["default"])(); //读取工程根目录下的config.json

            BUILDINFOS = (0, _getBuildInfo["default"])(USERCONFIG.version); //返回所有autoGetEntry({'带版本号的js':'XX.js'}),返回所有autoGetHtml({html = {keys: [],jsEntry: {},originList: [html目录]}})

            _context.next = 5;
            return _inquirer["default"].prompt([{
              type: 'checkbox',
              name: 'selectedEntry',
              message: '请选择需要进行代码检测的页面:',
              choices: BUILDINFOS.autoGetHtml.keys
            }]);

          case 5:
            answers = _context.sent;

            if (!(answers.selectedEntry.length == 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", console.log(_cliColor["default"].red('没有选择任何页面,检测结束')));

          case 8:
            dirPaths = [];
            answers.selectedEntry.forEach(function (path) {
              var dirPathJSX = path.replace(/[.\w]*\/index$/, '**/*.js*');
              var dirPathTSX = path.replace(/[.\w]*\/index$/, '**/*.ts*');
              dirPaths.push(dirPathJSX, dirPathTSX);
            });

            try {
              runLint(dirPaths);
            } catch (err) {
              console.log(_cliColor["default"].red('代码检测异常！'));
              console.log(_cliColor["default"].red(err));
            }

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Lint() {
    return _ref.apply(this, arguments);
  };
}();

var _default = Lint;
exports["default"] = _default;
module.exports = exports.default;