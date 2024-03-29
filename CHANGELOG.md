## 更新日志

## v1.2.4

-   增加一些第三方库 mjs 的支持

## v1.2.3

-   解决 autoGetEntry 只返回 index.js 的问题， 需要兼容.ts|.tsx|.js|.jsx
-   修改：src/utils/get-build-info.js
-   输出 build.json 格式：

```json
{
    "htmlEntry": ["./src/p/react-redux/index.html", "./src/p/react-test/index.html"],
    "jsEntry": {
        "src/p/react-redux/4.2.3/index": "./src/p/react-redux/index",
        "src/p/react-test/4.2.3/index": "./src/p/react-test/index"
    },
    "selectedEntry": ["src/p/react-redux/4.2.3/index", "src/p/react-test/4.2.3/index"]
    //...其他内容
}
```

## v1.2.1

-   排查问题：

```
Module parse failed: Unexpected token (3:19)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| import React from 'react';
|
> const Lazy = (props: any) => {
|     console.log(props);
|     return <div>Lazy Component!!!</div>;
```

-   从提示看是缺少 ts-loader，实际上：
    ```
        const tsx = {
            test: /\.(ts|tsx)$/,
    +++     include: [dirSrc, /@bairong\//],  // 这行
        }
    ```
-   设置以上配置可以解决， 无从下手定位该问题;

## v1.2.0

-   webpack 升级到 5.68.x 版本
-   去掉:
    -   "friendly-errors-webpack-plugin": "^1.7.0"
    -   "thread-loader": "^2.1.3",
    -   "html-webpack-replace-host": "^1.1.0",
-   html-webpack-plugin 升级到 5.5.x 版本
-   TODO: dev 环境一下开始 html-webpack-plugin 插件报错，原因待查；
-   webpack-plugin-inline-source 升级到 1.1.0.beta-1
-   开启了 optimization, 分离代码；
    -   dev 环境下没有使用 html-webpack-plugin, 无法自动引入分离的包;
    -   只在构建发布的时候开启分离 功能;
-   webpack5 剔除 node 核心库，需要自行引入（Error Message： webpack < 5 used to include polyfills for node.js core modules by default.）
    -node-polyfill-webpack-plugin 插件解决
-   【注意】webpack.base.config.js 中增加以下修改，可能会引起 npm6.x、npm8.x、pnpm7.x 安装的 br-bid 找不到依赖。
    -   以上修改需反复测试; （v1.2.0-beta.2）
    -   以上问题在 pnpm 下确实会有问题，继续尝试.(v1.2.0-beta.3)
    -   以上问题通过屏蔽别名解决，不再引入 node-polyfill。
    -   所有引入的依赖必须构建成 web 版本
-   配置 target: ['web', 'es5']， 未开启'es5' 会导致不转箭头函数等 es6 语法。
-   参考 react-script 优化配置 https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/config/webpack.config.js
-   babel-loader 需要加载的插件都使用 require()方式加载。(v1.2.0-beta.4)
-   1.2.0-beta.6
    -   关闭日常构建时候的进度提示
    -   关闭构建生成注释文件 LICENSE.txt, 需要安装 terser-webpack-plugin
    -   去掉 html-webpack-plugin 给入口 js 添加的 hash
    -   修改 webpack 配置，给入口文件添加“\[name\].\[contenthash:10\].js”

---

## v1.1.4

-   1.1.4~1.1.4-beta.x
-   bug fix， config.json 中自定义别名，会在 bid dev 的时候被改为本地路径.
-   html-webpack-plugin 的 head 中增加环境及变量、构建时间:
    ```js
    meta: {
            env: env,
            'update-time': { 'update-time': new Date().toLocaleString() }
        }
    ```
-   (v1.1.4-beta.3)
-   解决 npm 8.x 版本下部分包找不到依赖的问题：
    ```
    ERROR in ./node_modules/antd-mobile/es/components/center-popup/center-popup.js
    Module not found: Error: Can't resolve '@react-spring/web' in 'xxx/node_modules/antd-mobile/es/components/center-popup'
    ```
    -   修改：webpack/resolve.js，增加 'node_modules'
-   (v1.1.4-beta.4)
-   增加 getGitBranchVersion 方法，获取当前分支的版本号； getGitBranchVersion()=>Promise<string>
-   html 文件中 script、link 标签支持 data-src, 发布时替换成 src。

---

## v1.1.3

-   1.1.3 ~ 1.1.3-beta.8
-   更新依赖:
    -   http-proxy-middleware -> 2.0.3
    -   urllib -> 2.38.0
    -   less -> 4.1.2
    -   less-loader -> 10.2.0
-   删除依赖:
    -   wasm-module-webpack-plugin
    -   @wasm-tool/wasm-pack-plugin
-   增加别名@src
    -   '@src': path.join(process.cwd(), './src/')
    -   可以这样用 "@src/xxx/myModule.js"
    -   还可以组合成新的别名, config.json:
    ```json
    {
        "alias": {
            "@myAlias": "@src/p/xxx"
        }
    }
    ```
-   less-loader 配置修改:
    ```
        lessOptions: {
        javascriptEnabled: true,
    +    math: 'always' // less4.0 后默认不开启，需要手动开启， https://lesscss.org/usage/#less-options-math
        }
    ```
    -   inline 到 html 中的 less 文件也要处理。（1.1.3-beta.6）
-   新增依赖:
    -   tailwindcss
    -   wasm-loader
-   新增功能: tailwindcss, https://tailwindcss.com/
-   业务工程根目录增加 tailwind.config.js 文件, 基础配置如下:

```js
module.exports = {
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {}
    },
    variants: {
        extend: {}
    },
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.{htm,html}']
}
```

-   tailwindcss 中 px 没被 pxtorem 插件处理。（1.1.3-beta.7）
    -   调整插件顺序（从上到下，先进先出）
-   增加对 mjs 的支持（1.1.3-beta.8）
-   config.json 中增加 js、ts 文件处理时候处理依赖的配置。 解决部分依赖库不转 es6、es5 的问题。

    -   注意，不要设置“node_modules”
    -   （1.1.3-beta.8）

    ```json
    {
        "include": ["/three/"]
    }
    ```

---

## v1.1.2

-   新增构建时的变量：BUILD_ENV <'local' | 'daily' | 'gray' | 'production'>, 可以通过该变量屏蔽构建的
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

---

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

---

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
