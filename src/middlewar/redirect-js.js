/*
 * @Author: dezhao.chen
 * @Date: 2020-04-18 17:10:19
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-08-14 14:02:58
 * @Description: 当开发环境请求带有@version的入口js时，重定向到移除@version/的路径
 */

export default function(req, res, next) {
    if (/\/@cdnhost[\s\S]+@version/g.test(req.path)) {
        const filePath = req.path.replace(/\/@cdnhost[\s\S]+@version/g, '')
        res.redirect(filePath)
        return
    }
    next()
}
