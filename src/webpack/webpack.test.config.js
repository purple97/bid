import path from 'path'
import webpack from 'webpack'
// import pluginsConfig from './plugins';
import { merge } from 'webpack-merge'
import webpackBaseConfig from './webpack.base.config'
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
const cwdPath = process.cwd() // 工程项目root path
const analyzerConfig = {
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8866
}
const WebpackConfig = parentDirPath => outputPath => {
    const output = outputPath ? outputPath : './deploy'
    const smp = new SpeedMeasurePlugin()
    return smp.wrap(
        merge(webpackBaseConfig(parentDirPath), {
            mode: 'development',
            devtool: 'eval-cheap-module-source-map',
            entry: {},
            output: {
                path: path.resolve(cwdPath, output),
                filename: '[name].js',
                chunkFilename: '[id].js',
                publicPath: '/'
            },
            resolve: {
                modules: [path.join(parentDirPath, 'node_modules')]
            },
            plugins: [
                new BundleAnalyzerPlugin(analyzerConfig),
                new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(process.env.NODE_ENV) }),
                new webpack.NoEmitOnErrorsPlugin()
            ]
        })
    )
}

// export default WebpackConfig;
module.exports = WebpackConfig
