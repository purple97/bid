/*
 *	生成webpack module.noParse 配置
 *	忽略查找出现在其中的js所引入的依赖
 */
const getNoParse = userNoParse => {
    let noParse = []; // 忽略查找出现在其中的js所引入的依赖
    if (userNoParse) {
        noParse = noParse.concat(userNoParse);
    }
    noParse.forEach(function (np, ind) {
        noParse[ind] = np.replace(/^@br\//, this.webpack.alias['@br']); // 替换@br别名
    });
    return noParse;
};

export default getNoParse;
