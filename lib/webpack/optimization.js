"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  splitChunks: {
    cacheGroups: {
      commons: {
        chunks: 'initial',
        minChunks: 2,
        maxInitialRequests: 5,
        // The default limit is too small to showcase the effect
        minSize: 0 // This is example is too small to create commons chunks

      },
      vendor: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        priority: 10,
        enforce: true
      }
    }
  },
  runtimeChunk: {
    name: 'manifest' // name: function (entrypoint) {
    //     return `manifest~${entrypoint.name}`;
    // }

  }
};
exports["default"] = _default;
module.exports = exports.default;