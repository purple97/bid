"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _path = _interopRequireDefault(require("path"));

var _gitTools = _interopRequireDefault(require("git-tools"));

var _getAlias = _interopRequireDefault(require("./get-alias"));

var _checkNpm = _interopRequireDefault(require("./check-npm"));

var _getNoParse = _interopRequireDefault(require("./get-noParse"));

var _getBuildInfo = _interopRequireDefault(require("./get-build-info"));

var _getConfigJson = _interopRequireDefault(require("./get-config-json"));

var _setConfigFlieVersion = _interopRequireDefault(require("./set-config-flie-version"));

var _projectGenerator = _interopRequireDefault(require("./project-generator"));

var _requireFileToJson = _interopRequireDefault(require("./require-file-to-json"));

var Utils = /*#__PURE__*/function () {
  function Utils() {
    (0, _classCallCheck2["default"])(this, Utils);
    this.userConfig = this.getUserConfig = (0, _getConfigJson["default"])();
    this.getBuildInfo = _getBuildInfo["default"];
    this.fileGenerator = {
      projectGenerator: _projectGenerator["default"]
    };
    this.npm = {
      checkNpm: _checkNpm["default"]
    };
    this.webpack = {
      alias: (0, _getAlias["default"])(this.userConfig.alias || {}),
      noParse: (0, _getNoParse["default"])(this.userConfig.noParse || [])
    };
    this.git = (0, _setConfigFlieVersion["default"])(this.userConfig);
    this.git.repo = new _gitTools["default"](process.cwd());
    this.requireFileToJSON = _requireFileToJson["default"];
  }

  (0, _createClass2["default"])(Utils, [{
    key: "path",
    get: function get() {
      return {
        rootPath: this.rootPath,
        cwdPath: this.cwdPath
      };
    }
  }, {
    key: "rootPath",
    get: function get() {
      return _path["default"].join(__dirname, '../');
    }
  }, {
    key: "cwdPath",
    get: function get() {
      return process.cwd();
    }
  }]);
  return Utils;
}();

var _default = new Utils();

exports["default"] = _default;
module.exports = exports.default;