import fs from 'fs';
import path from 'path';

const htmlre = new RegExp(/index\.(htm|html)$/);
const jsre = new RegExp(/index\.(js|jsx|ts|tsx)$/);
const rx_src = new RegExp(`${path.sep}src${path.sep}`);

function insetVersionByJS(pathname, version) {
    let v = version ? version : '';
    return pathname.replace(jsre, `${v}/index`);
}

function insetVersionByHTML(pathname, version) {
    let v = version ? version : '';
    return pathname.replace(htmlre, `${v}/index`);
}

export const autoGetEntry = (version, devFilePath) => {
    // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
    let entry = {};
    let getJsEntry = dir => {
        fs.readdirSync(dir).forEach(file => {
            let pathname = path.join(dir, file);
            if (fs.statSync(pathname).isDirectory()) {
                getJsEntry(pathname);
            } else if (jsre.test(pathname)) {
                let relFileName = path.join(`.${path.sep}src${path.sep}`, pathname.split(rx_src)[1]);
                // let relFileName = `.${path.sep}${pathname}`;
                // let v = version ? version + '/' : '';
                const relFileKey = insetVersionByJS(relFileName, version);
                entry[relFileKey] = '.' + path.sep + relFileName;
            }
        });
        return entry;
    };
    return getJsEntry(devFilePath);
};

export const autoGetHtml = (version, devFilePath) => {
    // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
    let html = {
        keys: [],
        jsEntry: {},
        originList: []
    };
    let getJsHtml = dir => {
        // 递归遍历约定的目录结构，设置jsEntry配置
        fs.readdirSync(dir).forEach(file => {
            let pathname = path.join(dir, file);
            if (fs.statSync(pathname).isDirectory()) {
                getJsHtml(pathname);
            } else if (htmlre.test(pathname)) {
                let relFileName = path.join(`.${path.sep}src${path.sep}`, pathname.split(rx_src)[1]);
                html.originList.push(`.${path.sep}${relFileName}`);
                let relFileKey = insetVersionByHTML(relFileName, version)
                // relFileKey = path.join('src/', relFileKey.split(/\/src\//)[1].replace(htmlre, '/index'));
                const relFileKeyPaths = relFileKey.split(path.sep);
                relFileKey = path.join(path.dirname(path.join(...relFileKeyPaths)), './index');
                let tmpJS = path.join(path.dirname(relFileName), './index');
                // console.log(relFileName, relFileKey, tmpJS);
                html.jsEntry[relFileKey] = `.${path.sep}${tmpJS}`;
                html.keys.push(relFileKey);
            }
        });
    };
    getJsHtml(devFilePath);
    return html;
};

const getBuildInfo = version => {
    let devFilePath = path.join(process.cwd(), './src/p');
    let isInit = fs.existsSync(devFilePath);
    if (isInit) {
        return {
            autoGetEntry: autoGetEntry(version, devFilePath),
            autoGetHtml: autoGetHtml(version, devFilePath)
        };
    } else {
        return {
            autoGetEntry: {},
            autoGetHtml: {}
        }
    }
};

export default getBuildInfo;
