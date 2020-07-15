/*
 * less 文件转 css
 * 会在less文件同级目录中生成css文件， 方便打包的时候inline到html文件里;
 */
import fs from 'fs';
import path from 'path';
import less from 'less';

/* 获取入口文件路径
 */
function getLessEntry(dirPathArray) {
    return dirPathArray.map(fileName => {
        fileName = path.resolve(process.cwd(), fileName);
        return fileName.replace(/\.htm(l)$/, '.less');
    });
}

/* less转css
 */
function lessToCss(lessFilePath) {
    let fileCss = fs.readFileSync(lessFilePath, 'utf-8');
    return less.render(fileCss, { env: 'production', paths: [path.dirname(lessFilePath)], compress: true }).then(
        output => {
            fs.writeFileSync(lessFilePath.replace('.less', '.css'), output.css);
            return Promise.resolve({ name: lessFilePath, status: true });
        },
        error => Promise.resolve({ name: lessFilePath, status: false, message: error.message })
    );
}

export default function (dirPathArray, callback) {
    let entrys = getLessEntry(dirPathArray);
    let taskArray = [];
    entrys.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            taskArray.push(lessToCss(filePath));
        } else {
            console.log('文件不存在:', filePath);
        }
    });
    Promise.all(taskArray)
        .then(values => {
            values.forEach(value => {
                if (!value.status) console.log(value.name, ':', value.message);
            });
            console.log('css编译结束!');
            typeof callback === 'function' && callback();
        })
        .catch(error => {
            console.log(error);
            console.log('css编译失败!!!');
        });
}
