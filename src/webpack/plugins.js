/*  */
import path from 'path';
import webpack from 'webpack';
import Utils from '../utils';
import program from 'commander';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackReplaceHost from 'html-webpack-replace-host';
import LazyPathPlugin from 'bid-lazy-path-plugin';
import HtmlWebpackInlineSourcePlugin from 'webpack-plugin-inline-source';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import ProgressBar from 'progress-bar-webpack-plugin';
const tagVersion = Utils.getUserConfig.version;

function setHtmlPlugin(file, env) {
    const isOnline = env === 'tag' || env === 'productionNoTag' || env == 'production' || env === 'gray';
    let chunksName = path.dirname(file) + '/' + tagVersion + '/index';
    chunksName = chunksName.replace(/^\.\//, '');
    // chunksName = isOnline ? chunksName.replace(/[.\d]*\/index/g, 'index') : chunksName;
    const _filename = isOnline ? path.join('./html/build', file) : file;
    // console.log(path.join('./html/build', file), isOnline, chunksName);
    return new HtmlWebpackPlugin({
        version: tagVersion,
        inject: true,
        hash: true,
        minify: {
            collapseWhitespace: true,
            removeComments: true
        },
        filename: _filename,
        template: path.resolve(file),
        chunks: [chunksName]
    });
}

function getPlugins({ htmlEntry, env = 'local', cdnhost }) {
    const hotUpdateMode = program.args[0].hot;
    const jsHost = `${cdnhost || Utils.getUserConfig.cdnhost}/${Utils.getUserConfig.appName}/`;
    let config = [
        new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(process.env.NODE_ENV) }),
        //避免重复的模块
        // new webpack.optimize.DedupePlugin()
        /* 跳过编译时出错的代码并记录 , webpack.NoErrorsPlugin webpack4后改为webpack.NoEmitOnErrorsPlugin */
        new webpack.NoEmitOnErrorsPlugin()
    ];
    console.log('构建环境 NODE_ENV:', process.env.NODE_ENV);
    if (process.env.NODE_ENV != 'dev') {
        (env == 'local' || env == 'daily') && config.unshift(new ProgressBar());
        config.push(new CleanWebpackPlugin({ dry: true }));
        config.push(new LazyPathPlugin({ version: tagVersion, jsHost, env }));
        if (typeof htmlEntry === 'string') {
            config.push(setHtmlPlugin(htmlEntry, env));
        } else if (Array.isArray(htmlEntry)) {
            htmlEntry.forEach(function(file) {
                config.push(setHtmlPlugin(file, env));
            });
        }
        config.push(
            new HtmlWebpackReplaceHost({
                replaceString: env == 'local' || env == 'daily' ? '' : jsHost
            })
        );

        config.push(
            new HtmlWebpackInlineSourcePlugin({
                env: env == 'local' || env == 'daily' ? 'development' : 'production'
            })
        );
    } else {
        config.push(new webpack.NamedModulesPlugin());
        hotUpdateMode && config.push(new webpack.HotModuleReplacementPlugin());
        config.push(new FriendlyErrorsPlugin());
    }
    // console.log(config);
    return config;
}

export default getPlugins;
