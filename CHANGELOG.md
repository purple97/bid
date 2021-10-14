## 更新日志

## v1.1.0
- webpack MultiCompiler 方式处理多个页面同时打包
    - 处理懒加载公共模块的问题

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
