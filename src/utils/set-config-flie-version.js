import fs from 'fs'
import path from 'path'
import Repo from 'git-tools'
import colors from 'cli-color'

const CWDPATH = process.cwd()
let gitRopo = new Repo(process.cwd())

const setVersion = userConfig => () => {
    let config = userConfig
    let version = config.version
    gitRopo.currentBranch((error, b) => {
        if (!error) {
            let reg = /^daily\/\d+\.\d+\.\d+$/g
            if (reg.test(b)) {
                let branch = b.split('daily/')[1]
                if (branch != version) {
                    console.log(colors.blue('将config.version由', version, '替换为', branch))
                    config.version = branch
                    let filename = path.join(CWDPATH, 'config.json')
                    let data = JSON.stringify(config, null, 4)
                    try {
                        fs.writeFileSync(filename, data)
                        console.log(colors.green('修改成功！'))
                        return config
                    } catch (err) {
                        console.log(colors.red('config.json写入失败，请检查该文件'))
                        console.log(colors.red(err))
                        return false
                    }
                }
            } else {
                console.log(colors.yellow('请在daily分支下进行开发：daily/x.y.z；'))
                return false
            }
        } else {
            console.log(colors.yellow('当前git环境异常。忽略config.verison更新'))
            return false
        }
    })
}

const setVersionThunk = userConfig => (tagBranch, callback) => {
    let config = userConfig
    let version = config.version
    gitRopo.remotes((err, remotes) => {
        if (!err) {
            let gitRemotes = remotes[0].url
            config.remotes = gitRemotes
            if (!tagBranch) {
                // 非tag发布
                gitRopo.currentBranch((error, b) => {
                    if (b === null) {
                        console.log(colors.magentaBright(`当前处于tag分支，将按照config.json配置中git的版本进行构建：${version}`))
                        let filename = path.join(CWDPATH, 'config.json')
                        let data = JSON.stringify(config)
                        fs.writeFile(filename, data, err => {
                            if (!err) {
                                console.log(colors.green('修改成功！'))
                                // return config;
                                return callback(err, config)
                            } else {
                                console.log(colors.red('config.json写入失败，请检查该文件'))
                                return callback(err, false)
                            }
                        })
                    } else {
                        let reg = /^daily\/\d+\.\d+\.\d+$/g // 只允许发布daily/x.y.z分支的代码，为保证安全，不支持tag回滚发布
                        if (reg.test(b)) {
                            let branch = b.split('daily/')[1]
                            if (branch != version) {
                                console.log(colors.blue('将config.version由', version, '替换为', branch))
                                config.version = branch
                                let filename = path.join(CWDPATH, 'config.json')
                                let data = JSON.stringify(config)
                                fs.writeFile(filename, data, err => {
                                    if (!err) {
                                        console.log(colors.green('修改成功！'))
                                        // return config;
                                        return callback(err, config)
                                    } else {
                                        console.log(colors.red('config.json写入失败，请检查该文件'))
                                        return callback(err, false)
                                    }
                                })
                            } else {
                                console.log(colors.green('当前git环境正常：' + branch))
                                return callback(error, config)
                            }
                        } else {
                            console.log(colors.yellow('请在daily分支下进行发布：daily/x.y.z；'))
                            return callback(error, false)
                        }
                    }
                })
            } else {
                // tag发布
                let hasTagFlag = false
                // todo bid tag version => 由tagBranch传递 publish/0.0.2
                gitRopo.tags((error, branchs) => {
                    for (let index = 0; index < branchs.length; index++) {
                        let item = branchs[index]
                        if (item.name == tagBranch) {
                            hasTagFlag = true
                        }
                    }
                    if (hasTagFlag) {
                        console.log(colors.green('Git中存在当前tag分支。'))
                    } else {
                        console.log(colors.yellow('Git中不存在当前tag分支，请注意！'))
                    }
                    let pubreg = /^publish\/\d+\.\d+\.\d+$/g // publish/x.y.z tag分支发布
                    if (pubreg.test(tagBranch)) {
                        // TODO 待测试！！
                        let branch = tagBranch.split('publish/')[1]
                        console.log(colors.blue('将config.version由', version, '替换为', branch))
                        config.version = branch
                        let filename = path.join(CWDPATH, 'config.json')
                        let data = JSON.stringify(config)
                        fs.writeFile(filename, data, err => {
                            if (!err) {
                                console.log(colors.green('修改成功！'))
                                return callback(err, config)
                            } else {
                                console.log(colors.red('config.json写入失败，请检查该文件'))
                                return callback(err, false)
                            }
                        })
                    } else {
                        console.log(colors.yellow('请在publish分支下进行发布：publish/x.y.z；'))
                        return callback(error, false)
                    }
                })
            }
        } else {
            return callback(err, false)
        }
    })
}
export default userConfig => ({
    setConfigVersion: setVersion(userConfig),
    setConfigVersionThunk: setVersionThunk(userConfig)
})
