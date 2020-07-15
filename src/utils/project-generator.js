import fs from 'fs';
import path from 'path';
import colors from 'cli-color';
import fse from 'fs-extra';

const projectGenerator = (args, callback) => {
    let dirname = args.dirname;
    let targetPath = '';
    let commonFilePath = path.join(path.join(__dirname, '..'), 'examples/commonFiles');

    if (!args.react) {
        targetPath = path.join(path.join(__dirname, '..'), 'examples/normal');
    } else {
        targetPath = path.join(path.join(__dirname, '..'), 'examples/react');
    }

    if (!dirname) {
        console.log(colors.red(`${dirname}目录不存在，初始化终止...`));
        process.exit(1);
    }

    fs.exists(path.join(dirname, './src'), exists => {
        if (exists) {
            console.log(colors.yellow(`${path.join(dirname, './src')}目录已存在，初始化终止...`));
            process.exit(1);
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
    });
};

export default projectGenerator;
