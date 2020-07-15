import path from 'path';
import colors from 'cli-color';
import program from 'commander';
import ProjectGenerator from '../utils/project-generator';

function InitProject() {
    console.log(colors.green('正在初始化工程目录ing...'));
    let dirname = path.join(process.cwd(), './');
    let initTime = new Date().getTime();
    ProjectGenerator({ dirname: dirname, react: program.react }, error => {
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
