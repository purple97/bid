import path from 'path'
import Utils from '../utils/'
import lessVariableInjection from 'less-variable-injection'
const dirSrc = path.join(process.cwd(), 'src')
const dirNodeModule = /node_modules/

function SetBabelPluginImport(pluginsConfig) {
    return pluginsConfig.map(item => {
        let newItem =
            typeof item === 'string'
                ? ['babel-plugin-import', { libraryName: item, libraryDirectory: 'es', style: true }, item]
                : ['babel-plugin-import', item, item.libraryName]
        return newItem
    })
}

export default () => {
    const configJson = Utils.getUserConfig
    let babelPluginImport = [
        [
            'babel-plugin-import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
            }
        ]
    ]
    if (configJson.babelPluginImport) {
        babelPluginImport = babelPluginImport.concat(SetBabelPluginImport(configJson.babelPluginImport))
    }
    // const isOnline = env == 'production';
    let jsx, tsx, ejs, less, css, file
    let babelOptions = {
        babelrc: false,
        cwd: path.resolve(Utils.path.parentDir, 'node_modules'),
        presets: [['@babel/preset-env'], '@babel/preset-react'],
        plugins: [
            [
                'babel-plugin-react-scoped-css',
                {
                    include: '.scoped.(le|c)ss$'
                }
            ],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-optional-chaining', // 可选链
            '@babel/plugin-proposal-nullish-coalescing-operator', // 双问号
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            'babel-plugin-add-module-exports',
            [
                '@babel/plugin-transform-runtime',
                {
                    helpers: false,
                    regenerator: true
                }
            ],
            ...babelPluginImport
        ],
        cacheDirectory: true
    }
    jsx = {
        test: /\.(js|jsx)$/,
        include: [dirSrc, /@bairong\//],
        // exclude: /node_modules/,
        use: [
            // 'thread-loader',
            {
                loader: 'babel-loader',
                options: babelOptions
            }
        ]
    }

    tsx = {
        test: /\.(ts|tsx)$/,
        include: [dirSrc, /@bairong\//],
        // exclude: /node_modules/,
        use: [
            // 'thread-loader',
            {
                loader: 'babel-loader',
                options: babelOptions
            },
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    happyPackMode: true
                }
            }
        ]
    }

    ejs = {
        test: /\.ejs$/,
        // exclude: path.resolve(Utils.path.cwdPath, 'node_modules'),
        use: [
            {
                loader: 'babel-loader',
                options: { cwd: path.resolve(Utils.path.parentDir, 'node_modules') }
            },
            { loader: 'ejs-loader?variable=data' }
        ]
    }
    less = {
        test: /\.less$/,
        // include: [dirSrc, dirNodeModule],
        // exclude: /node_modules/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'scoped-css-loader' },
            {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }
        ]
    }
    // 替换主题颜色
    if (configJson.theme && less.use[3].loader == 'less-loader') {
        console.info('启用less-loader变量替换!')
        if (!less.use[3].options) {
            less.use[3].options = { lessOptions: {} }
        }
        if (!less.use[3].options.lessOptions.plugins) {
            less.use[3].options.lessOptions.plugins = []
        }
        less.use[3].options.lessOptions.plugins.push(new lessVariableInjection(configJson.theme))
    }

    css = {
        test: /\.css$/,
        include: [dirSrc, dirNodeModule],
        // exclude: /node_modules/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: false
                }
            },
            { loader: 'scoped-css-loader' }
        ]
    }

    file = {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: { loader: 'file-loader' }
    }

    return [jsx, tsx, ejs, less, css, file]
}
