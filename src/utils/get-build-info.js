import fs from 'fs';
import path from 'path';

const htmlre = new RegExp(/index\.(htm|html)$/);
const jsre = new RegExp(/index\.(js|jsx|ts|tsx)$/);

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
    let isInit = fs.existsSync(devFilePath);
    let getJsEntry = dir => {
        fs.readdirSync(dir).forEach(file => {
            let pathname = path.join(dir, file);
            if (fs.statSync(pathname).isDirectory()) {
                getJsEntry(pathname);
            } else if (jsre.test(pathname)) {
                let relFileName = path.join('./src/', pathname.split(/\/src\//)[1]);
                // let v = version ? version + '/' : '';
                // let relFileKey = 'src/' + pathname.split('/src/')[1].split('index.js')[0] + v + 'index';
                const relFileKey = insetVersionByJS(pathname, version);
                entry[relFileKey] = relFileName;
            }
        });
        return entry;
    };
    if (isInit) {
        return getJsEntry(devFilePath);
    } else {
        return {};
    }
};

export const autoGetHtml = (version, devFilePath) => {
    // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
    let html = {
        keys: [],
        jsEntry: {},
        originList: []
    };
    let isInit = fs.existsSync(devFilePath);
    let getJsHtml = dir => {
        // 递归遍历约定的目录结构，设置jsEntry配置
        fs.readdirSync(dir).forEach(file => {
            let pathname = path.join(dir, file);

            if (fs.statSync(pathname).isDirectory()) {
                getJsHtml(pathname);
            } else if (htmlre.test(pathname)) {
                let relFileName = path.join('./src/', pathname.split(/\/src\//)[1]);
                html.originList.push(relFileName);
                // let v = version ? version + '/' : '';
                let relFileKey = insetVersionByHTML(pathname, version)
                relFileKey = path.join('src/', relFileKey.split(/\/src\//)[1].replace(htmlre, '/index'));
                let tmpJS = relFileName.replace(htmlre, '/index');
                html.jsEntry[relFileKey] = tmpJS;
                // let exists = fs.existsSync(path.join(process.cwd(), tmpJS));
                // if (exists) {
                //     html.jsEntry[relFileKey] = tmpJS;
                // } else {
                //     html.jsEntry[relFileKey] = false;
                // }
                html.keys.push(relFileKey);
            }
        });
    };
    if (isInit) {
        // 如果该项目路径已经进行了bid init初始化(拥有约定目录结构)
        getJsHtml(devFilePath);
        return html;
    } else {
        return {};
    }
};

const getBuildInfo = version => {
    let devFilePath = path.join(process.cwd(), './src/p');
    return {
        autoGetEntry: autoGetEntry(version, devFilePath),
        autoGetHtml: autoGetHtml(version, devFilePath)
    };
};

export default getBuildInfo;
