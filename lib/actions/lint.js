"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _wideAlign = _interopRequireDefault(require("wide-align"));

var _cliColor = _interopRequireDefault(require("cli-color"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _eslint = require("eslint");

var _getConfigJson = _interopRequireDefault(require("../utils/get-config-json"));

var _getBuildInfo = _interopRequireDefault(require("../utils/get-build-info"));

/*
    代码检测
*/
const printMessage = results => {
  let errorCount = 0;
  let warningCount = 0;
  results.forEach(res => {
    if (res.errorCount != 0) {
      console.log('\n', res.filePath);
      errorCount += res.errorCount;
      warningCount += res.warningCount;
      console.group();
      res.messages.forEach(mgs => {
        console.info(_cliColor.default.red(_wideAlign.default.center(mgs.line + ':' + mgs.column, 9)), _wideAlign.default.left(mgs.message, 64), _cliColor.default.cyan(_wideAlign.default.left(mgs.ruleId, 16)));
      });
      console.groupEnd();
    }
  });
  console.log('\n ===========================================================================');

  if (errorCount || warningCount) {
    console.info(_cliColor.default.red(errorCount + '处错误，' + warningCount + '处警告'));
  } else {
    console.info(_cliColor.default.yellow('未检测到代码错误，非常棒~ '));
  }
};

const runLint = dirPaths => {
  const eslintConfigFile = _path.default.resolve(process.cwd(), '.eslintrc');

  if (_fs.default.existsSync(eslintConfigFile) || _fs.default.existsSync(eslintConfigFile + '.js')) {
    const cli = new _eslint.CLIEngine({// extensions: ['.js', '.jsx', '.ts', '.tsx']
    });
    const report = cli.executeOnFiles(dirPaths);
    printMessage(report.results);
    return report;
  } else {
    console.log('请检查目录是否存在配置文件：.eslintrc');
    return null;
  }
};

const Lint = async () => {
  console.log(_cliColor.default.green('开始代码检测')); // let deployJSON = null;

  let USERCONFIG = (0, _getConfigJson.default)(); //读取工程根目录下的config.json

  let BUILDINFOS = (0, _getBuildInfo.default)(USERCONFIG.version); //返回所有autoGetEntry({'带版本号的js':'XX.js'}),返回所有autoGetHtml({html = {keys: [],jsEntry: {},originList: [html目录]}})

  const answers = await _inquirer.default.prompt([{
    type: 'checkbox',
    name: 'selectedEntry',
    message: '请选择需要进行代码检测的页面:',
    choices: BUILDINFOS.autoGetHtml.keys
  }]); // console.log(answers);

  if (answers.selectedEntry.length == 0) {
    return console.log(_cliColor.default.red('没有选择任何页面,检测结束'));
  }

  const dirPaths = [];
  answers.selectedEntry.forEach(path => {
    // const dirName = path.replace(/[.\w]*\/index$/, '**/*')
    // dirPaths.push(dirName + '.js*', dirName + '.ts*')
    const dirName = path.replace(/[.\w]*\/index$/, '/');
    dirPaths.push(dirName);
  });

  try {
    const report = runLint(dirPaths);
    return report;
  } catch (err) {
    console.log(_cliColor.default.red('代码检测异常！'));
    console.log(_cliColor.default.red(err));
    return Promise.reject(err);
  }
};

var _default = Lint;
exports.default = _default;
module.exports = exports.default;