import path from 'path';
import colors from 'cli-color';

import ProjectGenerator from '../utils/project-generator';

function InitProject(cmd, { projectDir, examplesDir }) {
    let dirname = projectDir || path.join(process.cwd(), './');
    let initTime = new Date().getTime();
    console.log(projectDir, examplesDir);
    const args = cmd.parent.rawArgs[cmd.parent.rawArgs.length - 1];
    const isReact = args == '-r' || args == '--react';
    console.log(colors.green('正在初始化工程目录ing4...'), colors.green(`${isReact ? 'react' : '普通'}工程`));
    ProjectGenerator({ dirname: dirname, examplesDir: examplesDir, react: isReact }, error => {
        // 初始化常规工程
        let nowTime = new Date().getTime();
        if (!error) {
            console.log(colors.green('依赖文件拷贝完成!'), colors.blue('共耗时:' + (nowTime - initTime) / 1000, 's'));
        } else {
            console.log(colors.red('拷贝依赖文件失败!'), colors.blue('共耗时:' + (nowTime - initTime) / 1000, 's'));
        }
    });
}

export default InitProject;
