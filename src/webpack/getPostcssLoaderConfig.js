import pxtorem from 'postcss-pxtorem'

export { default as tailwindcss } from 'tailwindcss'

/* postcss plugin： px to rem  */
export function getPluginPxtorem(value) {
    const pxtoremConfig = {
        rootValue: 37.5,
        propList: ['*'],
        exclude: /node_modules/i
    }

    if (value === true) {
        return pxtorem(pxtoremConfig)
    } else if (typeof value === 'number') {
        pxtoremConfig.rootValue = value
        return pxtorem(pxtoremConfig)
    } else {
        return pxtorem(Object.assign(pxtoremConfig, value))
    }
}

/* 生成postcss-loader相关配置 */
export function getPostcssLoaderConfig(plugins = []) {
    const postcssLoaderConfig = {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [...plugins]
            }
        }
    }

    return postcssLoaderConfig
}

export default getPostcssLoaderConfig
