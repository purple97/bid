import path from 'path'
import Utils from '../utils/'
import pluginsConfig from './plugins'
import performance from './performance'
import { merge } from 'webpack-merge'
import webpackBaseConfig from './webpack.base.config'

const cwdPath = process.cwd() // 工程项目root path
const envTypesByOnline = ['production-build', 'tag', 'productionNoTag', 'production', 'gray']

export default parentDirPath => (outputPath, buildConfig) => {
    const jsHost = `${buildConfig.cdnhost || Utils.getUserConfig.cdnhost}/${Utils.getUserConfig.appName}/`
    const isOnline = envTypesByOnline.indexOf(buildConfig.env) !== -1
    const output = outputPath ? outputPath : './deploy'
    // const _filename = isOnline ? 'javascripts/build/[name].js' : '[name].js'
    // console.log(path.resolve(cwdPath, output))
    return merge(webpackBaseConfig(parentDirPath), {
        mode: 'production',
        performance: performance,
        entry: {},
        output: {
            path: path.resolve(cwdPath, output),
            filename: '[name].js',
            // chunkFilename: _filename
            publicPath: isOnline ? jsHost : './'
        },
        resolve: {
            modules: [path.join(parentDirPath, 'node_modules')]
        },
        plugins: pluginsConfig(buildConfig)
    })
}
