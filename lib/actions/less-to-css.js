"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _less = _interopRequireDefault(require("less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * less 文件转 css
 * 会在less文件同级目录中生成css文件， 方便打包的时候inline到html文件里;
 */

/* 获取入口文件路径
 */
function getLessEntry(dirPathArray) {
  return dirPathArray.map(function (fileName) {
    fileName = _path["default"].resolve(process.cwd(), fileName);
    return fileName.replace(/\.htm(l)$/, '.less');
  });
}
/* less转css
 */


function lessToCss(lessFilePath) {
  var fileCss = _fs["default"].readFileSync(lessFilePath, 'utf-8');

  return _less["default"].render(fileCss, {
    env: 'production',
    paths: [_path["default"].dirname(lessFilePath)],
    compress: true
  }).then(function (output) {
    _fs["default"].writeFileSync(lessFilePath.replace('.less', '.css'), output.css);

    return Promise.resolve({
      name: lessFilePath,
      status: true
    });
  }, function (error) {
    return Promise.resolve({
      name: lessFilePath,
      status: false,
      message: error.message
    });
  });
}

function _default(dirPathArray, callback) {
  var entrys = getLessEntry(dirPathArray);
  var taskArray = [];
  entrys.forEach(function (filePath) {
    if (_fs["default"].existsSync(filePath)) {
      taskArray.push(lessToCss(filePath));
    } else {
      console.log('文件不存在:', filePath);
    }
  });
  Promise.all(taskArray).then(function (values) {
    values.forEach(function (value) {
      if (!value.status) console.log(value.name, ':', value.message);
    });
    console.log('css编译结束!');
    typeof callback === 'function' && callback();
  })["catch"](function (error) {
    console.log(error);
    console.log('css编译失败!!!');
  });
}