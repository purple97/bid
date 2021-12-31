import path from 'path'
import moduleConfig from './module'
import resolveConfig from './resolve'
import externalsConfig from './externals'
import optimizationConfig from './optimization'
const cwdPath = process.cwd() // 工程项目root path

export default function(parentDirPath) {
    //
    return {
        mode: 'production',
        // devtool: 'source-map',
        entry: {},
        output: {
            path: path.resolve(cwdPath, './build'),
            filename: '[name].js',
            chunkFilename: '[id].[hash:10].js',
            publicPath: '/'
        },
        //打包多文件和公共模块配置
        optimization: optimizationConfig,
        resolveLoader: {
            modules: [
                path.join(cwdPath, 'node_modules'),
                path.join(__dirname, '../../node_modules'),
                path.join(parentDirPath, 'node_modules')
            ]
        },
        externals: externalsConfig,
        module: moduleConfig(),
        resolve: resolveConfig,
        experiments: {
            asyncWebAssembly: true, // 开启 webpack5 的 asyncWebAssembly 功能
            syncWebAssembly: true,
            topLevelAwait: true // 开启 top-level-await
        }
    }
}
