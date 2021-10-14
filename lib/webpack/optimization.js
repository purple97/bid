"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // runtimeChunk: true,
  splitChunks: {
    chunks: 'all',
    maxInitialRequests: 20,
    // for HTTP2
    maxAsyncRequests: 20,
    // for HTTP2
    minSize: 4000000000 // for example only: chosen to match 2 modules
    // omit minSize in real use case to use the default of 30kb
    // cacheGroups: {
    //     commons: {
    //         chunks: 'initial',
    //         minChunks: 2,
    //         maxInitialRequests: 5, // The default limit is too small to showcase the effect
    //         minSize: 0 // This is example is too small to create commons chunks
    //     },
    //     vendor: {
    //         test: /node_modules/,
    //         chunks: 'initial',
    //         name: '../vendor',
    //         priority: 10,
    //         enforce: true
    //     }
    // }

  },
  runtimeChunk: {
    // name: 'manifest'
    name: function (entrypoint) {
      return `${entrypoint.name}`;
    }
  }
};
exports.default = _default;
module.exports = exports.default;