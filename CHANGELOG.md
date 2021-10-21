## 更新日志

## v1.1.0
- webpack MultiCompiler 方式处理多个页面同时打包
    - 处理懒加载公共模块的问题
    - 处理html-webpack-plugin插件输出路径问题；
    - 由于不用处理懒加载的路径， 去掉bid-lazy-path-plugin;
    - 入口文件entry， 从{"src/p/1.0.0/index":"src/p/index/index.js"} 给为 {index:"src/p/index/index.js"}
    - output.path 日常输出路径从 deploy/build 改为  deploy/build/src/p/1.0.0/
    - output.path 线上输出路径从 deploy/javascripts/build 改为  deploy/javascripts/build/src/p/1.0.0/
    - 更新依赖：webpack-plugin-inline-source@1.0.7-1


## v1.0.19
- less主题变量替换失效问题处理

## v1.0.18

-   增加 bable 配置:【可选链】【双问号】
    ```
    require('@babel/plugin-proposal-optional-chaining'), // 可选链
    require('@babel/plugin-proposal-nullish-coalescing-operator'), // 双问号
    ```

## v1.0.15

-   开发环境的 js 文件添加 hash 值, 去掉本解决本地调试的缓存问题
-   file: webpack/webpack.dev.config.js
