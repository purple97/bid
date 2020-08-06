/*
 * @Author: dezhao.chen
 * @Date: 2020-07-30 16:21:28
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-07-31 11:29:43
 * @Description: file content
 */

import { createProxyMiddleware } from 'http-proxy-middleware';

/**
 * @description: 实现一个简易的代理, 用法参考webpack-dev-server;
 * @param {Objdect | Object[]}
 * @return: middleware[]
 */
export default options => {
    const middlewares = [];
    const proxy = options => {
        if (options.target) {
            return createProxyMiddleware(options.context, options);
        }
    };

    if (options.target) {
        middlewares.push(proxy(options));
    } else {
        Object.keys(options).forEach(match => {
            let config = { ...options[match], context: match };
            middlewares.push(proxy(config));
        });
    }

    if (Array.isArray(options)) {
        options.forEach(config => {
            middlewares.push(proxy(config));
        });
    }
    return middlewares;
};
