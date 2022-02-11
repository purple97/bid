export default {
    // runtimeChunk: true,
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: 20, // for HTTP2
        maxAsyncRequests: 20, // for HTTP2
        // omit minSize in real use case to use the default of 30kb
        minSize: 4000000000
        // for example only: chosen to match 2 modules
        // cacheGroups: {
        //     commons: {
        //         chunks: 'initial',
        //         minChunks: 2,
        //         maxInitialRequests: 5, // The default limit is too small to showcase the effect
        //         minSize: 0 // This is example is too small to create commons chunks
        //     }
        // }
    },
    runtimeChunk: {
        // name: 'manifest'
        name: function(entrypoint) {
            return `${entrypoint.name}`
        }
    }
}
