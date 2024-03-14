import path from 'path'
import pluginsConfig from './plugins'
import { getExternals } from './externals'
import { merge } from 'webpack-merge'
import webpackBaseConfig from './webpack.base.config'
const cwdPath = process.cwd() // 工程项目root path

const WebpackConfig = (parentDirPath, option = {}) => (outputPath, filePath) => {
    const output = outputPath ? outputPath : './build'
    const env = 'local'
    return merge(
        webpackBaseConfig(parentDirPath),
        {
            mode: 'development',
            devtool: 'cheap-module-source-map', // webpack5属性
            entry: {},
            output: {
                path: path.resolve(cwdPath, output),
                filename: '[name].js',
                chunkFilename: '[id].js', //
                publicPath: path.sep
            },
            resolve: {
                modules: [path.join(parentDirPath, 'node_modules')]
            },
            externals: getExternals(env),
            plugins: pluginsConfig({ htmlEntry: filePath, env })
        },
        option
    )
}
// export default WebpackConfig;
module.exports = WebpackConfig
