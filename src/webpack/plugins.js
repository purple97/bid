/*  */
import path from 'path'
import webpack from 'webpack'
import Utils from '../utils'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import htmlInlineSourceLoaders from '../plugins/html-inline-source-loaders'
import HtmlWebpackInlineSourcePlugin from 'webpack-plugin-inline-source'

const tagVersion = Utils.getUserConfig.version

function setHtmlPlugin(file, env) {
    const isOnline = ['tag', 'productionNoTag', 'production-build', 'production', 'gray'].indexOf(env) !== -1
    const htmlOutputDir = path.resolve(process.cwd(), './deploy', isOnline ? './html/build' : './build')
    const cwdDir = path.resolve(process.cwd(), htmlOutputDir || './dist')
    return new HtmlWebpackPlugin({
        version: tagVersion,
        inject: 'body', // true | 'head' | 'body' ， 主js插入位置(head \ body)
        // hash: true, // true | false, 插入的js文件src后面增加?[hash]值，每次构建唯一
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
        })
    ]

    if (env == 'local' || env == 'production-build') {
        // 本地构建才显示进度条
        config.push(new webpack.ProgressPlugin({ percentBy: 'entries' }))
    }

    // config.push(new LazyPathPlugin({ version: tagVersion, jsHost, env }))
    if (env !== 'local') {
        config.push(setHtmlPlugin(htmlEntry, env))

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
