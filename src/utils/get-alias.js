import path from 'path'

const getAlias = userAlias => {
    /*
     *	生成webpack resolve.alias 别名配置
     */
    let alias = {
        // 别名
        '@br': path.join(process.cwd(), './src/c/'),
        '@src': path.join(process.cwd(), './src/')
    }
    // eslint-disable-next-line
    for (let aliasName in userAlias) {
        userAlias[aliasName] = userAlias[aliasName].replace(/^@br\//, alias['@br']).replace(/^@src\//, alias['@src']) // 将别名配置中的@br替换为'src/c'目录
    }
    alias = Object.assign(alias, userAlias)
    return alias
}

export default getAlias
