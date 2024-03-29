"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _less = _interopRequireDefault(require("less"));

/*
 * less 文件转 css
 * 会在less文件同级目录中生成css文件， 方便打包的时候inline到html文件里;
 */

/* 获取入口文件路径
 */
function getLessEntry(dirPathArray) {
  return dirPathArray.map(fileName => {
    fileName = _path.default.resolve(process.cwd(), fileName);
    return fileName.replace(/\.htm(l)$/, '.less');
  });
}
/* less转css
 */


function lessToCss(lessFilePath) {
  let fileCss = _fs.default.readFileSync(lessFilePath, 'utf-8');

  return _less.default.render(fileCss, {
    env: 'production',
    paths: [_path.default.dirname(lessFilePath)],
    compress: true,
    math: 'always'
  }).then(output => {
    _fs.default.writeFileSync(lessFilePath.replace('.less', '.css'), output.css);

    return Promise.resolve({
      name: lessFilePath,
      status: true
    });
  }, error => Promise.resolve({
    name: lessFilePath,
    status: false,
    message: error.message
  }));
}

function _default(dirPathArray, callback) {
  let entrys = getLessEntry(dirPathArray);
  let taskArray = [];
  entrys.forEach(filePath => {
    if (_fs.default.existsSync(filePath)) {
      taskArray.push(lessToCss(filePath));
    } else {
      console.log('文件不存在:', filePath);
    }
  });
  Promise.all(taskArray).then(values => {
    values.forEach(value => {
      if (!value.status) console.log(value.name, ':', value.message);
    });
    console.log('css编译结束!');
    typeof callback === 'function' && callback();
  }).catch(error => {
    console.log(error);
    console.log('css编译失败!!!');
  });
}

module.exports = exports.default;