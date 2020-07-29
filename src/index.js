/*
 * @author:dezhao.chen
 * @Email:10949221@qq.com
 * 工具库、webpack基础配置、bid工具Exprees中间件
 * 未经本人允许禁止商业用途
 */
export { default as Utils } from './utils/index';
export { default as getIp } from './utils/getip';
export { default as Lint } from './actions/lint';
export { default as Version } from './actions/version';
export { default as InitProject } from './actions/init';
export { default as middlewar } from './middlewar/index';
export { default as LessToCss } from './actions/less-to-css';
export { default as IconfontToBase64 } from './actions/iconfont';
export { default as CompareVersion } from './utils/compare-version';
export { default as WebpackProConfig } from './webpack/webpack.pro.config';
export { default as WebpackDevConfig } from './webpack/webpack.dev.config';
export { default as WebpackTestConfig } from './webpack/webpack.test.config';
export { merge as WebpackMerge } from 'webpack-merge';
