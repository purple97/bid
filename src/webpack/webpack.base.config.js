import path from 'path';
import moduleConfig from './module';
import resolveConfig from './resolve';
import externalsConfig from './externals';
// const optimizationConfig = require('./optimization');
const cwdPath = process.cwd(); // 工程项目root path
export default function (parentDirPath) {
    //
    return {
        mode: 'production',
        // devtool: 'source-map',
        entry: {},
        output: {
            path: path.resolve(cwdPath, './build'),
            filename: '[name].js',
            chunkFilename: '[id].js',
            publicPath: '/'
        },
        //打包多文件和公共模块配置
        // optimization: optimizationConfig,
        resolveLoader: {
            modules: [
                path.join(cwdPath, 'node_modules'),
                path.join(__dirname, '../../node_modules'),
                path.join(parentDirPath, 'node_modules')
            ]
        },
        externals: externalsConfig,
        module: moduleConfig(),
        resolve: resolveConfig
    };
}
