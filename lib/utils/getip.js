"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _os = _interopRequireDefault(require("os"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getIPAddress = function getIPAddress() {
  var IPv4 = '127.0.0.1',
      // hostName,
  en; // hostName = os.hostname();

  en = _os["default"].networkInterfaces().eth0 || _os["default"].networkInterfaces().en0;

  for (var i = 0; i < en.length; i++) {
    if (en[i].family == 'IPv4') {
      IPv4 = en[i].address;
    }
  }

  return IPv4;
};

var _default = getIPAddress;
exports["default"] = _default;