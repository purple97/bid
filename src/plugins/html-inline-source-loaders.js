import path from 'path'
import { transformSync } from '@babel/core'
import UglifyJs from 'uglify-js'

const jsRules = function(code) {
    return transformSync(code, {
        cwd: path.resolve(__dirname, 'node_modules'),
        presets: ['@babel/preset-env'],
        plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread'
        ]
    }).code
}

export default (name, code) => {
    let _code = code
    if (/\.(js|jsx)$/.test(name)) {
        _code = UglifyJs.minify(jsRules(_code)).code
    }
    return _code
}
