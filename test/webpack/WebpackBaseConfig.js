const path = require('path')
const assert = require('assert');
const webpackBaseConfig = require('../../lib/webpack/webpack.base.config.js')


/*
* 测试返回的基础配置格式是否正确
*/
describe('webpack.base.config.js', () => {
    const parentDirPath = path.resolve(__dirname, '../src/index.js')
    const config = webpackBaseConfig(parentDirPath)
    console.log(config.module.rules);

    it('#config.output', function () {
        assert.equal(config.output.path, path.resolve(process.cwd(), './build'))
        assert.equal(config.output.filename, '[name].js')
        assert.equal(config.output.chunkFilename, '[id].[contenthash:10].js')
        assert.equal(config.output.publicPath, '.' + path.sep)
    });

    it('#config.module.rules', function () {
        assert.equal(config.module.rules.length, 7)
        const tests = []
        config.module.rules.forEach(item => tests.push(item.test.toString()))
        assert.ok(tests.includes(new RegExp(/\.(js|jsx|mjs)$/).toString()))
        assert.ok(tests.includes(new RegExp(/\.(ts|tsx)$/).toString()))
        assert.ok(tests.includes(new RegExp(/\.mjs$/).toString()))
        assert.ok(tests.includes(new RegExp(/\.ejs$/).toString()))
        assert.ok(tests.includes(new RegExp(/\.css$/).toString()))
        assert.ok(tests.includes(new RegExp(/\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i).toString()))
    });

    it('#config.resolve.extensions', function () {
        const exName = ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.css', '.less', '.json', '.html']
        assert.ok(Array.isArray(config.resolve.extensions))
        assert.ok(config.resolve.extensions.length >= exName.length)
        config.resolve.extensions.forEach((ex) => assert.ok(exName.includes(ex)))
    })

    it('#config.resolve.alias', function () {
        assert.equal(config.resolve.alias['@br'], path.join(process.cwd(), './src/c/'));
        assert.equal(config.resolve.alias['@src'], path.join(process.cwd(), './src/'));
    });
})
