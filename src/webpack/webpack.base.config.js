import path from 'path'
import Utils from '../utils/'
import moduleConfig from './module'
import resolveConfig from './resolve'
import externalsConfig from './externals'

const cwdPath = process.cwd() // 工程项目root path

export default function(parentDirPath) {
    // Utils.setParentDir(parentDirPath) //设置br-bid所在目录， 方便babel-loader查找相关依赖
    //
    return {
        mode: 'production',
        target: ['web', 'es5'], // webpack5属性
        entry: {},
        output: {
            path: path.resolve(cwdPath, './build'),
            filename: '[name].js',
            chunkFilename: '[id].[contenthash:10].js', // hash | chunkhash | contenthash
            publicPath: './'
        },
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
