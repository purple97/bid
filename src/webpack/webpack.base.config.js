import path from 'path'
import moduleConfig from './module'
import resolveConfig from './resolve'
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
            publicPath: './'
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
        module: moduleConfig(),
        resolve: resolveConfig
    }
}
