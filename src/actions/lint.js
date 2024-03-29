/*
    代码检测
*/
import fs from 'fs'
import path from 'path'
import align from 'wide-align'
import colors from 'cli-color'
import inquirer from 'inquirer'
import { CLIEngine } from 'eslint'
import getUserConfig from '../utils/get-config-json'
import getBuildInfo from '../utils/get-build-info'

const printMessage = results => {
    let errorCount = 0
    let warningCount = 0
    results.forEach(res => {
        if (res.errorCount != 0) {
            console.log('\n', res.filePath)
            errorCount += res.errorCount
            warningCount += res.warningCount
            console.group()
            res.messages.forEach(mgs => {
                console.info(
                    colors.red(align.center(mgs.line + ':' + mgs.column, 9)),
                    align.left(mgs.message, 64),
                    colors.cyan(align.left(mgs.ruleId, 16))
                )
            })
            console.groupEnd()
        }
    })
    console.log('\n ===========================================================================')
    if (errorCount || warningCount) {
        console.info(colors.red(errorCount + '处错误，' + warningCount + '处警告'))
    } else {
        console.info(colors.yellow('未检测到代码错误，非常棒~ '))
    }
}
const runLint = dirPaths => {
    const eslintConfigFile = path.resolve(process.cwd(), '.eslintrc')
    if (fs.existsSync(eslintConfigFile) || fs.existsSync(eslintConfigFile + '.js')) {
        const cli = new CLIEngine({
            // extensions: ['.js', '.jsx', '.ts', '.tsx']
        })
        const report = cli.executeOnFiles(dirPaths)
        printMessage(report.results)
        return report
    } else {
        console.log('请检查目录是否存在配置文件：.eslintrc')
        return null
    }
}

const Lint = async () => {
    console.log(colors.green('开始代码检测'))
    // let deployJSON = null;
    let USERCONFIG = getUserConfig() //读取工程根目录下的config.json
    let BUILDINFOS = getBuildInfo(USERCONFIG.version) //返回所有autoGetEntry({'带版本号的js':'XX.js'}),返回所有autoGetHtml({html = {keys: [],jsEntry: {},originList: [html目录]}})
    const answers = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selectedEntry',
            message: '请选择需要进行代码检测的页面:',
            choices: BUILDINFOS.autoGetHtml.keys
        }
    ])
    // console.log(answers);
    if (answers.selectedEntry.length == 0) {
        return console.log(colors.red('没有选择任何页面,检测结束'))
    }
    const dirPaths = []
    answers.selectedEntry.forEach(path => {
        // const dirName = path.replace(/[.\w]*\/index$/, '**/*')
        // dirPaths.push(dirName + '.js*', dirName + '.ts*')
        const dirName = path.replace(/[.\w]*\/index$/, '/')
        dirPaths.push(dirName)
    })
    try {
        const report = runLint(dirPaths)
        return report
    } catch (err) {
        console.log(colors.red('代码检测异常！'))
        console.log(colors.red(err))
        return Promise.reject(err)
    }
}

export default Lint
