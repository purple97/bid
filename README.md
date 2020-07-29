<!--
 * @Author: dezhao.chen
 * @Date: 2020-07-10 17:02:25
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-07-29 15:03:01
 * @Description: 前端开发脚手架基础库
-->

## Bid 前端开发脚手架基础库

-   项目结构：

    -   /src/utils, 基础工具库
    -   /src/action, 脚手架各行为函数（初始化项目目录、less 转 css、iconfont 转 base64 等）
    -   /src/middewar, 本地开发服务中间件, 配合 Express 使用;
    -   /public，资源目录
    -   /lib，src 目录转 es5 后的代码

-   相关 api

```javascript
import {
    Utils,
    getIp,
    Lint,
    Version,
    InitProject,
    middlewar,
    LessToCss,
    IconfontToBase64,
    CompareVersion,
    WebpackProConfig,
    WebpackDevConfig,
    WebpackTestConfig,
    merge
} from 'bid';
```

### Utils

-   提供环境变量、用户 config.json 配置信息等;

### getIp

-   获取当前用户的 IP 地址

### Lint

-   代码检测行为

### Version

-   对比远端版本和本地版本

### InitProject

-   初始化工程目录

### middlewar

-   各种中间件，本地服务时用到

### LessToCss

-   less 转 css 工具

### IconfontToBase64

-   iconfont 转 base64 工具

### CompareVersion

-   比较两个版本几号， version1>version2 返回 1

### WebpackProConfig

-   webpack 线上配置

### WebpackDevConfig

-   webpack 开发配置

### WebpackTestConfig

-   webpack 打包，并输出打包性能相关;

### merge

-   webpack config 合并方法; 等同于 webpack-merage
