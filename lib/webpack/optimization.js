"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // runtimeChunk: true,
  splitChunks: {
    chunks: 'all',
    minChunks: 1,
    name: 'vendor',
    // maxInitialRequests: 20, // for HTTP2
    // maxAsyncRequests: 20, // for HTTP2
    // omit minSize in real use case to use the default of 30kb
    // minSize: 4000000000
    // for example only: chosen to match 2 modules
    cacheGroups: {
      commons: {
        chunks: 'initial',
        test: /node_modules/,
        minChunks: 1,
        maxInitialRequests: 5 // The default limit is too small to showcase the effect

      }
    }
  }
};
exports.default = _default;
module.exports = exports.default;