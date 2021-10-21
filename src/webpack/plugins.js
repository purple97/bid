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
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import ProgressBar from 'progress-bar-webpack-plugin'
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
        path: path.resolve(process.cwd(), './deploy', isOnline ? './html/build' : './build'),
        filename: file,
        template: path.resolve(file)
    })
}

function getPlugins({ htmlEntry, env = 'local', cdnhost }) {
    const jsHost = `${cdnhost || Utils.getUserConfig.cdnhost}/${Utils.getUserConfig.appName}/`
    let config = [
        new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(process.env.NODE_ENV) }),
        //避免重复的模块
        // new webpack.optimize.DedupePlugin()
        /* 跳过编译时出错的代码并记录 , webpack.NoErrorsPlugin webpack4后改为webpack.NoEmitOnErrorsPlugin */
        new webpack.NoEmitOnErrorsPlugin()
    ]

    if (process.env.NODE_ENV != 'dev') {
        if (env == 'local' || env == 'daily' || env == 'production-build') {
            config.unshift(new ProgressBar())
            // config.push(new CleanWebpackPlugin())
        }

        // config.push(new LazyPathPlugin({ version: tagVersion, jsHost, env }))
        if (typeof htmlEntry === 'string') {
            config.push(setHtmlPlugin(htmlEntry, env))
        } else if (Array.isArray(htmlEntry)) {
            htmlEntry.forEach(function(file) {
                config.push(setHtmlPlugin(file, env))
            })
        }
        config.push(
            new HtmlWebpackReplaceHost({
                replaceString: env == 'local' || env == 'daily' ? '' : jsHost
            })
        )

        config.push(
            new HtmlWebpackInlineSourcePlugin({
                loaders: htmlInlineSourceLoaders
            })
        )
    } else {
        // config.push(new webpack.NamedModulesPlugin())
        config.push(new FriendlyErrorsPlugin())
    }
    // console.log(config);
    return config
}

export default getPlugins
