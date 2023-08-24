const path = require('path')
const assert = require('assert');
const { autoGetHtml } = require('../lib/utils/get-build-info');
const compareVersion = require('../lib/utils/compare-version')
const getAlias = require('../lib/utils/get-alias')
const requireFileToJson = require('../lib/utils/require-file-to-json')
const checkNpmPackageVersion = require('../lib/utils/check-npm')
const npm = require('npm')

describe('src/utils/', function () {
    describe('get-build-info', function () {
        const version = '1.0.0';
        const devFilePath = path.join(process.cwd(), './src/utils');
        it('#autoGetHtml()', function () {
            const data = autoGetHtml(version, devFilePath)
            assert.equal(JSON.stringify(data), JSON.stringify({ keys: [], jsEntry: {}, originList: [] }));
        });
    })

    describe('compare-version', function () {
        it('#compareVersion()', function () {
            assert.equal(compareVersion('1.0.1', '1.0.0'), 1)
            assert.equal(compareVersion('1.0.12', '1.0.2'), 1)
            assert.equal(compareVersion('1.10.1', '1.8.1'), 1)
            assert.equal(compareVersion('22.0.0', '3.0.0'), 1)
        });
    })

    describe('get-alias', function () {
        it('#getAlias()', function () {
            const userAlias = {
                ['@']: './src/p/'
            };
            const alias = getAlias(userAlias);
            assert.equal(JSON.stringify(alias), JSON.stringify({
                '@br': path.join(process.cwd(), './src/c/'),
                '@src': path.join(process.cwd(), './src/'),
                '@': './src/p/',
            }));
        });
    })

    describe('require-file-to-json', function () {
        it('requireFileToJson()', function () {
            const json = requireFileToJson(path.join(process.cwd(), 'package.json'))
            assert.equal(json.name, 'bid-base')
            assert.equal(json.main, 'lib/index.js')
        })
    })

    /* describe('check-npm', function () {
        it('checkNpm()', function (done) {
            const name = '@bairong/br-bid'
            const version = '2.0.5'
            this.timeout(5000)
            checkNpmPackageVersion(name, function (err, version, moduleInfo) {
                if (err) {
                    done(err)
                    return
                }
                console.log(moduleInfo)
                done()
            });
        })
    }) */
})
