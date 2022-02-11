import path from 'path'
import pluginsConfig from './plugins'
import { merge } from 'webpack-merge'
import webpackBaseConfig from './webpack.base.config'
const cwdPath = process.cwd() // 工程项目root path

const WebpackConfig = parentDirPath => (outputPath, filePath) => {
    const output = outputPath ? outputPath : './build'
    return merge(webpackBaseConfig(parentDirPath), {
        mode: 'development',
        devtool: 'eval-cheap-module-source-map',
        entry: {},
        output: {
            path: path.resolve(cwdPath, output),
            filename: '[name].js',
            chunkFilename: '[id].js', //
            publicPath: '/'
        },
        resolve: {
            modules: [path.join(parentDirPath, 'node_modules')]
        },
        plugins: pluginsConfig({ htmlEntry: filePath, env: 'dev' })
    })
}
// export default WebpackConfig;
module.exports = WebpackConfig
