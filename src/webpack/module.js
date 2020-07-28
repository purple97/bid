import Utils from '../utils/';
export default function () {
    return {
        rules: require('./getBabelConfig')(Utils.getUserConfig),
        //不在扫正则所匹配的模块的依赖
        noParse: function (content) {
            const pass = /(lodash|zepto|jquery)\.js/.test(content);
            return pass;
        }
    };
}
