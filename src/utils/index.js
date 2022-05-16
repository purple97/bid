import fs from 'fs'
import path from 'path'
import Repo from 'git-tools'
import getAlias from './get-alias'
import checkNpm from './check-npm'
import getNoParse from './get-noParse'
import getBuildInfo from './get-build-info'
import getUserConfig from './get-config-json'
import setConfigFileVersion from './set-config-flie-version'
import projectGenerator from './project-generator'
import requireFileToJSON from './require-file-to-json'

class Utils {
    constructor() {
        this.userConfig = this.getUserConfig = getUserConfig()
        this.getBuildInfo = getBuildInfo
        this.fileGenerator = { projectGenerator }
        this.npm = { checkNpm }
        this.webpack = {
            alias: getAlias(this.userConfig.alias || {}),
            noParse: getNoParse(this.userConfig.noParse || [])
        }
        this.git = setConfigFileVersion(this.userConfig)
        this.git.repo = new Repo(process.cwd())
        this.requireFileToJSON = requireFileToJSON
        this.__parentdir
        this.tailwindcss = fs.existsSync(path.resolve(process.cwd(), './tailwind.config.js'))
    }
    get path() {
        return {
            get rootPath() {
                return path.join(__dirname, '../../')
            },
            get cwdPath() {
                return process.cwd()
            },
            get parentDir() {
                return this.__parentdir || path.join(__dirname, '../../')
            }
        }
    }
    setParentDir(_path) {
        this.__parentdir = _path
    }
}

export default new Utils()
