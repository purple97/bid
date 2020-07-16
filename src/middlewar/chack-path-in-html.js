/*
 * @Author: dezhao.chen
 * @Date: 2020-04-18 17:06:56
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-07-16 16:08:49
 * @Description: 检测html中的js路径是否正确
 * @用法:
 * const checkPathInHtmlMiddlewar = require('./chack-path-in-html');
 * app.get('/index.html', checkPathInHtmlMiddlewar);
 */
import fs from 'fs';
import path from 'path';
import colors from 'cli-color';
import cheerio from 'cheerio';

const checkHtmlFilePath = filepath => {
    let isExist = true;
    let jssrc = filepath.replace('.html', '.js');
    jssrc = '@cdnhost' + jssrc.replace('index.js', '@version/index.js');
    let filedata = fs.readFileSync(path.join(process.cwd(), filepath), 'utf-8');
    let $ = cheerio.load(filedata);
    let Scripts = $(`script[src="${jssrc}"]`);
    if (Scripts.length <= 0) {
        isExist = false;
    }
    return isExist;
};

const ChackPathInHtml = (req, res, next) => {
    if (checkHtmlFilePath(req.path)) {
        // res.render('.' + req.path, { htmlWebpackPlugin: null });
        next();
    } else {
        console.log(colors.red('index.js地址和html地址不匹配:' + req.path));
    }
};

export default ChackPathInHtml;
