import colors from 'cli-color';
import CHECKNPM from '../utils/check-npm';
export default userVersion => {
    console.log(colors.blue('正在检测远端版本...'));
    console.log(colors.green(`当前版本为：${userVersion}`));
    CHECKNPM('br-bid', function (err, version, moduleInfo) {
        if (err) {
            console.log(colors.red('检测失败...'));
            console.error(err);
            return;
        }
        console.log(colors.green(`最新版本为：${moduleInfo['dist-tags'].latest}`));
        if (moduleInfo['dist-tags'].latest != userVersion) {
            console.log(colors.yellow('当前版本不是最新，请手动更新...'));
        } else {
            console.log(colors.green('恭喜您，当前版本是最新版本.'));
        }
    });
};
