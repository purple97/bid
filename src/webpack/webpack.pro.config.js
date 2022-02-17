import path from 'path'
import Utils from '../utils/'
import pluginsConfig from './plugins'
import performance from './performance'
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
            performance: performance,
            entry: {},
            output: {
                path: path.resolve(cwdPath, output),
                filename: '[name].js',
                // chunkFilename: _filename
                publicPath: isOnline ? jsPath : `./${Utils.getUserConfig.version}/`
            },
            resolve: {
                modules: [path.join(parentDirPath, 'node_modules')]
            },
            plugins: pluginsConfig({ htmlEntry: buildConfig.htmlEntry, env })
        },
        option
    )
}
