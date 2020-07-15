import fs from 'fs';
import path from 'path';
export const autoGetEntry = (version, devFilePath) => {
    // 传递config.json的version字段，则自动在输出位置增加@version匹配。否则忽略@version
    let entry = {};
    let isInit = fs.existsSync(devFilePath);
    let getJsEntry = dir => {
        fs.readdirSync(dir).forEach(file => {
            let pathname = path.join(dir, file);

            if (fs.statSync(pathname).isDirectory()) {
                getJsEntry(pathname);
            } else if (/index\.js$/.test(pathname)) {
                let relFileName = './src/' + pathname.split('/src/')[1];
                let v = version ? version + '/' : '';
                let relFileKey = 'src/' + pathname.split('/src/')[1].split('index.js')[0] + v + 'index';
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
            } else if (/index\.html$/.test(pathname)) {
                let relFileName = './src/' + pathname.split('/src/')[1];
                html.originList.push(relFileName);
                let v = version ? version + '/' : '';
                let relFileKey = 'src/' + pathname.split('/src/')[1].split('index.html')[0] + v + 'index';
                let tmpJS = relFileName.replace(/\.html$/g, '.js');
                let exists = fs.existsSync(path.join(process.cwd(), tmpJS));
                if (exists) {
                    html.jsEntry[relFileKey] = tmpJS;
                } else {
                    html.jsEntry[relFileKey] = false;
                }
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
