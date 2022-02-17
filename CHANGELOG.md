## 更新日志

## v1.1.2

-   bug fix:
    -   publicPath 导致懒加载模块不能正常加载问题。
    -   uglify-js 报错的问题。
    -   webpack 版本 指定 4.x 版本
    -   postcss-pxtorem 降级到 5.1.1 版本
-   增加 postcss-loader, 并且增加 postcss-pxtorem 插件
    -   需要 config.json 中配置 pxtorm

```js
// 三种方式
{
    // 使用默认配置开启
   "pxtorem": true
   // 指定rootValue的值
   "pxtorem": 37.5
   // 覆盖默认配置
   "pxtorem": {
       //...
   }
}
```

-   html 内嵌 js 内容插件 html-inline-source-loaders 修改,
    -   transform 改为 transformSync
-   config.json 增加动态配置 babel-plugin-import. "babelPluginImport"

```json
{
    "babelPluginImport": [
        {
            "libraryName": "@bairong/rs-ui",
            "style": true
        }
    ]
}
```

-   webpack.{env}.config.js 中, 增加参数 option = {} ，会合并到默认配置中（merge(config, option)）
-   增加暴露 webpack-merge 的接口，方便自定义配置（mergeWithCustomize, mergeWithRules, unique）

    ```js
    const { mergeWithCustomize, mergeWithRules, unique } = require('bid-base')
    ```

-   ~~webpack 增加 增加 WebAssembly 支持~~ (下个版本增加)
    -   TODO： ~~打包的 wasm 文件路径问题需要特殊处理，【暂时没有解决办法】~~
-   ~~增加配置：~~

```js
experiments: {
    asyncWebAssembly: true, // 开启 webpack5 的 WebAssembly 功能
    syncWebAssembly: true,
    topLevelAwait: true // 开启 top-level-await
}
```

-   使用方式：

```js
import { HelloWebAssembly } from 'hello-wasm'
console.log('hello WebAssembly !', HelloWebAssembly())
```

## v1.1.0

-   webpack MultiCompiler 方式处理多个页面同时打包
    -   处理懒加载公共模块的问题
    -   处理 html-webpack-plugin 插件输出路径问题；
    -   由于不用处理懒加载的路径， 去掉 bid-lazy-path-plugin;
    -   入口文件 entry， 从{"src/p/1.0.0/index":"src/p/index/index.js"} 给为 {index:"src/p/index/index.js"}
    -   output.path 日常输出路径从 deploy/build 改为 deploy/build/src/p/1.0.0/
    -   output.path 线上输出路径从 deploy/javascripts/build 改为 deploy/javascripts/build/src/p/1.0.0/
    -   更新依赖：webpack-plugin-inline-source@1.0.8
        -   加工 inline 的 js 文件内容， es6 转 es5，压缩
        -   webpack-plugin-inline-source 插件的 loader “plugins/html-inline-source-loaders.js”

## v1.0.19

-   less 主题变量替换失效问题处理

## v1.0.18

-   增加 bable 配置:【可选链】【双问号】
    ```
    require('@babel/plugin-proposal-optional-chaining'), // 可选链
    require('@babel/plugin-proposal-nullish-coalescing-operator'), // 双问号
    ```

## v1.0.15

-   开发环境的 js 文件添加 hash 值, 去掉本解决本地调试的缓存问题
-   file: webpack/webpack.dev.config.js
