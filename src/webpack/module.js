import Utils from '../utils/';
import getBabelConfig from './getBabelConfig';
export default function() {
    return {
        rules: getBabelConfig(Utils.getUserConfig),
        //不在扫正则所匹配的模块的依赖
        noParse: function(content) {
            const pass = /(lodash|zepto|jquery)\.js/.test(content);
            return pass;
        }
    };
}
