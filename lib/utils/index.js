"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _gitTools = _interopRequireDefault(require("git-tools"));

var _getAlias = _interopRequireDefault(require("./get-alias"));

var _checkNpm = _interopRequireDefault(require("./check-npm"));

var _getNoParse = _interopRequireDefault(require("./get-noParse"));

var _getBuildInfo = _interopRequireDefault(require("./get-build-info"));

var _getConfigJson = _interopRequireDefault(require("./get-config-json"));

var _setConfigFlieVersion = _interopRequireDefault(require("./set-config-flie-version"));

var _projectGenerator = _interopRequireDefault(require("./project-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);

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
  }

  _createClass(Utils, [{
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