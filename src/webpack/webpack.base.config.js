import path from 'path'
import moduleConfig from './module'
import resolveConfig from './resolve'
import externalsConfig from './externals'
// import optimizationConfig from './optimization'
const cwdPath = process.cwd() // 工程项目root path

export default function(parentDirPath) {
    //
    return {
        mode: 'production',
        // devtool: 'eval', // webpack5属性
        target: ['web', 'es5'], // webpack5属性
        entry: {},
        output: {
            path: path.resolve(cwdPath, './build'),
            filename: '[name].js',
            chunkFilename: '[id].[hash:10].js',
            publicPath: './'
        },
        //打包多文件和公共模块配置
        // optimization: optimizationConfig, // webpack5下部分被废弃
        resolveLoader: {
            modules: [
                path.join(cwdPath, 'node_modules'),
                path.join(__dirname, '../../node_modules'),
                path.join(parentDirPath, 'node_modules')
            ]
        },
        module: moduleConfig(),
        resolve: resolveConfig,
        experiments: {
            asyncWebAssembly: true, // 开启 webpack5 的 asyncWebAssembly 功能
            syncWebAssembly: true,
            topLevelAwait: true // 开启 top-level-await
        }
    }
}
