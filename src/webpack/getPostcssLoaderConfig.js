import pxtorem from 'postcss-pxtorem'
import tailwindcss from 'tailwindcss'
import postcssImport from 'postcss-import'

/* postcss plugin： px to rem  */
export function pluginPxtorem(value) {
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
function getPostcssLoaderConfig(configJson, plugins = []) {
    const postcssLoaderConfig = {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [...plugins, pluginPxtorem(configJson.pxtorem), postcssImport, tailwindcss]
            }
        }
    }

    return postcssLoaderConfig
}

export default getPostcssLoaderConfig
