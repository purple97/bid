import path from 'path'
import Utils from '../utils/'
import pluginsConfig from './plugins'
import performance from './performance'
import optimization from './optimization'
import { getExternals } from './externals'
import { merge } from 'webpack-merge'
import webpackBaseConfig from './webpack.base.config'

const cwdPath = process.cwd() // 工程项目root path
const envTypesByOnline = ['production-build', 'tag', 'productionNoTag', 'production', 'gray']

export default (parentDirPath, option = {}) => (outputPath, buildConfig) => {
    const isOnline = envTypesByOnline.indexOf(buildConfig.env) !== -1
    const output = outputPath ? outputPath : './deploy'
    const jsHost = `${buildConfig.cdnhost || Utils.getUserConfig.cdnhost}/${Utils.getUserConfig.appName}/`
    const jsPath = `${jsHost}${output.replace(/^.*\/src/, 'src')}`
    const env = !isOnline ? 'daily' : buildConfig.env === 'gray' ? 'gray' : 'production'
    return merge(
        webpackBaseConfig(parentDirPath),
        {
            mode: 'production',
            // performance: performance,
            entry: {},
            output: {
                path: path.resolve(cwdPath, output),
                filename: '[name].js',
                // chunkFilename: _filename
                publicPath: isOnline ? jsPath + '/' : `./${Utils.getUserConfig.version}/`
            },
            //打包多文件和公共模块配置, dev环境下没有使用html-webpack-plugin，无法自动引入分离的包
            optimization: optimization, // webpack5下部分被废弃
            resolve: {
                modules: [path.join(parentDirPath, 'node_modules')]
            },
            externals: getExternals(env),
            plugins: pluginsConfig({ htmlEntry: buildConfig.htmlEntry, env })
        },
        option
    )
}
