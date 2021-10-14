import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

class bidHtmlWebpackPlugin extends HtmlWebpackPlugin {
    constructor(options) {
        const cwdDir = path.resolve(process.cwd(), options.path || './dist')
        options.filename = path.resolve(cwdDir, options.filename)
        super(options)
        this.apply = function(compiler) {
            HtmlWebpackPlugin.prototype.apply.bind(this)(compiler)
        }
    }
}

export default bidHtmlWebpackPlugin
