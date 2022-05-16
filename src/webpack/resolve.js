import path from 'path'
import Utils from '../utils/'

let alias = Utils.webpack.alias

export default {
    modules: [
        path.join(Utils.path.cwdPath, 'src'),
        path.join(Utils.path.cwdPath, 'node_modules'),
        path.join(Utils.path.rootPath, 'node_modules')
    ],
    //require时候自动补全扩展名;
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.less', '.css'],
    alias: alias // 别名
}
