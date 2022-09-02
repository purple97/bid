/*  */
import path from 'path'
import webpack from 'webpack'
import Utils from '../utils'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import htmlInlineSourceLoaders from '../plugins/html-inline-source-loaders'
// import HtmlWebpackReplaceHost from 'html-webpack-replace-host'
import HtmlWebpackInlineSourcePlugin from 'webpack-plugin-inline-source'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

const tagVersion = Utils.getUserConfig.version

function setHtmlPlugin(file, env) {
    const isOnline = ['tag', 'productionNoTag', 'production-build', 'production', 'gray'].indexOf(env) !== -1
    const htmlOutputDir = path.resolve(process.cwd(), './deploy', isOnline ? './html/build' : './build')
    const cwdDir = path.resolve(process.cwd(), htmlOutputDir || './dist')
    return new HtmlWebpackPlugin({
        version: tagVersion,
        inject: 'body', // true | 'head' | 'body' ， 主js插入位置(head \ body)
        hash: true, // true | false, 插入的js文件src后面增加?[hash]值，每次构建唯一
        minify: {
            collapseWhitespace: true,
            removeComments: true
        },
        // 配置加入的 <meta/>
        meta: {
            env: env,
            'update-time': { 'update-time': new Date().toLocaleString() }
        },
        path: htmlOutputDir,
        filename: path.resolve(cwdDir, file),
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
        // new webpack.optimize.DedupePlugin(),
        /* 跳过编译时出错的代码并记录 , webpack.NoErrorsPlugin webpack4后改为webpack.NoEmitOnErrorsPlugin */
        // new webpack.NoEmitOnErrorsPlugin(),
        // 解决问题：webpack < 5 used to include polyfills for node.js core modules by default.
        new NodePolyfillPlugin()
    ]

    if (env == 'local' || env == 'daily' || env == 'production-build') {
        config.push(new webpack.ProgressPlugin({ percentBy: 'entries' }))
    }

    // config.push(new LazyPathPlugin({ version: tagVersion, jsHost, env }))
    if (env !== 'local') {
        config.push(setHtmlPlugin(htmlEntry, env))

        // console.log(jsPath)
        // config.push(
        //     new HtmlWebpackReplaceHost({
        //         replaceString: env == 'local' || env == 'daily' ? '' : jsPath
        //     })
        // )
        config.push(
            new HtmlWebpackInlineSourcePlugin({
                /* html-webpack-plugin, v5.5 版本
                 * 不传入getHooks，它不执行相关hooks
                 */
                htmlWebpackPluginHooks: HtmlWebpackPlugin.getHooks,
                // 对inline的js代码二次加工
                loaders: htmlInlineSourceLoaders
            })
        )
    }

    return config
}

export default getPlugins
