import path from 'path'
import Utils from '../utils/'
import lessVariableInjection from 'less-variable-injection'
import getPostcssLoaderConfig, { getPluginPxtorem, tailwindcss } from './getPostcssLoaderConfig'

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
        // cwd: path.resolve(Utils.path.parentDir, 'node_modules'),
        cwd: path.resolve(__dirname, '../../'),
        presets: [['@babel/preset-env' /* , { modules: 'commonjs' } */], '@babel/preset-react'],
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
            '@babel/plugin-proposal-class-static-block', // 静态块
            // '@babel/plugin-proposal-async-do-expressions', // 异步的 do表达式
            // '@babel/plugin-proposal-do-expressions', //do 表达式
            '@babel/plugin-proposal-export-default-from', // export xx from 'xx'
            // '@babel/plugin-proposal-function-bind', // 函数绑定语法糖：双冒号
            '@babel/plugin-proposal-class-properties', // 类属性
            '@babel/plugin-proposal-object-rest-spread',
            'babel-plugin-add-module-exports',
            [
                '@babel/plugin-transform-runtime',
                {
                    helpers: false,
                    regenerator: true
                }
            ],
            'babel-plugin-syntax-dynamic-import',
            'babel-plugin-syntax-async-functions',
            ...babelPluginImport
        ],
        cacheDirectory: true
    }
    jsx = {
        test: /\.(js|jsx)$/,
        // 部分较新的js库会使用一些es6特新，需要加入到编译中，例如: three.js
        include: [dirSrc, /@bairong\//],
        // exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions
            }
        ]
    }

    tsx = {
        test: /\.(ts|tsx)$/,
        include: [dirSrc, /@bairong\//],
        use: [
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
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'scoped-css-loader' },
            {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true,
                        math: 'always' // less4.0后默认不开启，需要手动开启， https://lesscss.org/usage/#less-options-math
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

    /* webpack5 自带url-loader功能 */
    file = {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
        parser: {
            dataUrlCondition: {
                maxSize: 4 * 1024 // 4kb
            }
        },
        generator: {
            filename: 'static/[hash][ext][query]'
        }
    }

    const postcssPlugins = []

    //开启 tailwindcss
    if (Utils.tailwindcss) {
        postcssPlugins.push(tailwindcss)
    }
    //开启 px 转 rem
    if (configJson.pxtorem) {
        postcssPlugins.push(getPluginPxtorem(configJson.pxtorem))
    }

    if (postcssPlugins.length > 0) {
        const postcssLoaderConfig = getPostcssLoaderConfig(postcssPlugins)
        less.use.splice(3, 0, postcssLoaderConfig)
        css.use.splice(3, 0, postcssLoaderConfig)
    }

    //处理.wasm文件
    // wasm = {
    //     test: /\.wasm$/,
    //     type: 'javascript/auto',
    //     use: ['wasm-loader']
    // }

    const mjs = {
        test: /\.mjs$/,
        include: [/node_modules/],
        type: 'javascript/auto'
    }

    // const content = {
    //     test: [/.(gltf|l3d|fbx)$/i, /loaddir.png$/i],
    //     loader: 'content-loader'
    // }

    /* 部分依赖是需要babel转义，可以通过config.js配置 */
    if (configJson.include) {
        const includes = configJson.include.map(item => new RegExp(item))
        const setInclude = (oldIncludes, addIncludes) => (!oldIncludes ? addIncludes : [...oldIncludes, ...addIncludes])
        jsx.include = setInclude(jsx.include, includes)
        tsx.include = setInclude(tsx.include, includes)
        // less.include = setInclude(less.include, includes)
        mjs.include = setInclude(mjs.include, includes)
    }
    return [jsx, tsx, mjs, ejs, less, css, file]
}
