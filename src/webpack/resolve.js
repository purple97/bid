import path from 'path'
import Utils from '../utils/'

let alias = Utils.webpack.alias
// 忽略部分node模块
const nodeAlias = {
    assert: false,
    url: false,
    http: false,
    https: false,
    tty: false,
    stream: false,
    os: false,
    util: false,
    zlib: false,
    querystring: false
}

export default {
    modules: [
        path.join(Utils.path.cwdPath, 'src'),
        'node_modules', // 解决npm 8.x版本下部分包找不到依赖的问题
        path.join(Utils.path.cwdPath, 'node_modules'),
        path.join(__dirname, '../..'),
        path.join(Utils.path.rootPath, 'node_modules')
    ],
    //require时候自动补全扩展名;
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.less', '.css'],
    alias: alias, // 别名
    fallback: nodeAlias
}
