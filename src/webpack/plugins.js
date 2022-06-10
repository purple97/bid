/*  */
import path from 'path'
import webpack from 'webpack'
import Utils from '../utils'
import HtmlWebpackPlugin from '../plugins/html-webpack-plugin'
import htmlInlineSourceLoaders from '../plugins/html-inline-source-loaders'
// import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackReplaceHost from 'html-webpack-replace-host'
// import LazyPathPlugin from 'bid-lazy-path-plugin'
import HtmlWebpackInlineSourcePlugin from 'webpack-plugin-inline-source'
// import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
// import ProgressBar from 'progress-bar-webpack-plugin'
// import WasmModuleWebpackPlugin from 'wasm-module-webpack-plugin'

const tagVersion = Utils.getUserConfig.version

function setHtmlPlugin(file, env) {
    const isOnline = ['tag', 'productionNoTag', 'production-build', 'production', 'gray'].indexOf(env) !== -1
    // let chunksName = path.dirname(file) + '/' + tagVersion + '/index'
    // chunksName = chunksName.replace(/^\.\//, '')
    // chunksName = isOnline ? chunksName.replace(/[.\d]*\/index/g, 'index') : chunksName;
    // const _filename = isOnline ? path.join('./html/build', file) : file
    return new HtmlWebpackPlugin({
        version: tagVersion,
        inject: true,
        hash: true,
        minify: {
            collapseWhitespace: true,
            removeComments: true
        },
        meta: {
            env: env,
            'update-time': { 'update-time': new Date().toLocaleString() }
        },
        path: path.resolve(process.cwd(), './deploy', isOnline ? './html/build' : './build'),
        filename: file,
        template: path.resolve(file)
    })
}

function getPlugins({ htmlEntry, env = 'daily', cdnhost }) {
    const jsHost = `${cdnhost || Utils.getUserConfig.cdnhost}/${Utils.getUserConfig.appName}/`
    const jsPath = jsHost + path.dirname(`${htmlEntry.replace(/^\.\//, '')}`) + `/${Utils.getUserConfig.version}/`

    let config = [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            BUILD_ENV: JSON.stringify(env)
        }),
        //避免重复的模块
        // new webpack.optimize.DedupePlugin()
        /* 跳过编译时出错的代码并记录 , webpack.NoErrorsPlugin webpack4后改为webpack.NoEmitOnErrorsPlugin */
        new webpack.NoEmitOnErrorsPlugin()
    ]

    if (process.env.NODE_ENV != 'dev') {
        // config.push(new LazyPathPlugin({ version: tagVersion, jsHost, env }))
        config.push(setHtmlPlugin(htmlEntry, env))

        // console.log(jsPath)
        config.push(
            new HtmlWebpackReplaceHost({
                replaceString: env == 'local' || env == 'daily' ? '' : jsPath
            })
        )

        config.push(
            new HtmlWebpackInlineSourcePlugin({
                loaders: htmlInlineSourceLoaders
            })
        )
    } else {
        // config.push(new webpack.NamedModulesPlugin())
        // config.push(new FriendlyErrorsPlugin())
    }
    // console.log(config);
    return config
}

export default getPlugins
