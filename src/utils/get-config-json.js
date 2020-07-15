/*
 *	读取工程根目录下的config.json
 */
import fs from 'fs';
import path from 'path';
import colors from 'cli-color';
const getUserConfig = fileName => {
    const _fileName = fileName || 'config.json';
    const configPath = path.join(process.cwd(), _fileName);
    let configJSON = {};
    try {
        configJSON = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : configPath;
    } catch (e) {
        console.log(colors.red('解析"config.json"时出错。'));
        process.exit(1);
    }
    return configJSON;
};

export default getUserConfig;
