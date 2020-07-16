/**
 * @fileOverview
 * @author dezhao
 */
// let path = require('path');
import lessMiddleware from 'less-middleware';

export default lessMiddleware(process.cwd(), {
    preprocess: {
        path: function (pathname) {
            let _path = pathname;
            if (_path.indexOf('/build') != -1) {
                _path = pathname.replace(/build/, 'src');
            }
            return _path;
        }
    },
    //dest: path.join(process.cwd()),
    debug: true
});
