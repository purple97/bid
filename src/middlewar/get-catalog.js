import fs from 'fs';
import path from 'path';
import Utils from '../utils/index';

let style = '';
let rem = '';
style = fs.readFileSync(path.resolve(__dirname, '../../public/body_style.css'), 'utf-8');
rem = fs.readFileSync(path.resolve(__dirname, '../../public/rem.js'), 'utf-8');
let mata = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
            <meta name="format-detection" content="telephone=no"/>`;

if (style) {
    style = mata + '<style>' + style + '</style>';
}
if (rem) {
    rem = '<script type="text/javascript">' + rem + '</script>';
    style += rem;
}

let FilterPath = [/^\./, /node_modules/];

function GetCatalog(req, res, next) {
    let _path = req.path;
    let _html = style + '<ul><li><a href="../">...</a></li>';
    let re = /.[a-zA-Z0-9_]+$/;
    if (!_path.match(re)) {
        fs.readdir(path.join(Utils.path.cwdPath, _path), (err, files) => {
            if (err) {
                console.log('readdir error');
                console.log(err);
                res.send(err);
            } else {
                let _files = FilterFilesArray(files, FilterPath);
                _files.forEach(item => {
                    let tmpPath = _path + item;
                    let itemType = 'file';
                    _html += '<li><a data-fileType="' + itemType + '" href="' + tmpPath + '">' + item + '</a></li>';
                });
                _html += '</ul>';
                res.send(_html);
            }
        });
    } else {
        next();
    }
}

function FilterFilesArray(files, filters) {
    let _files = [];
    files.forEach(item => {
        let needFilter = false;
        filters.forEach(filter => {
            if (item.match(filter)) {
                needFilter = true;
            }
        });
        if (!needFilter) {
            _files.push(item);
        }
    });
    return _files;
}

export default GetCatalog;
