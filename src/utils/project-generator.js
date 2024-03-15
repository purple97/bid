import fs from 'fs';
import path from 'path';
import colors from 'cli-color';
import fse from 'fs-extra';

const projectGenerator = (args, callback) => {
    const dirname = args.dirname;
    const examplesDir = args.examplesDir;
    let targetPath = '';
    const commonFilePath = path.join(examplesDir, './commonFiles');

    if (!args.react) {
        targetPath = path.join(examplesDir, './normal');
    } else {
        targetPath = path.join(examplesDir, './react');
    }

    if (!dirname) {
        console.log(colors.red(`${dirname}目录不存在，初始化终止...`));
        process.exit(1);
    }

    /* fs.exists(path.join(dirname, './src'), exists => {
        if (exists) {
        }
        fse.copy(targetPath, dirname, {}, () => {
            console.log(colors.green('目录结构创建成功！'));
            if (typeof callback == 'function') {
                callback();
            }
        });
        fse.copy(commonFilePath, dirname, {}, () => {
            console.log(colors.green('配置文件创建成功！'));
        });
    }); */

    // fs.exists弃用，改为 fs.access 版本
    fs.access(dirname, fs.constants.F_OK, (err) => {
        if (err) {
            fse.copy(targetPath, dirname, {}, () => {
                console.log(colors.green('目录结构创建成功！'));
                if (typeof callback == 'function') {
                    callback();
                }
            });
            fse.copy(commonFilePath, dirname, {}, () => {
                console.log(colors.green('配置文件创建成功！'));
            });
        } else {
            console.log(colors.yellow(`${path.join(dirname, './src')}目录已存在，初始化终止...`));
            process.exit(1);
        }
    });
};

export default projectGenerator;
