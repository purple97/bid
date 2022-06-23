import Utils from '../utils/'

export function getExternals(env) {
    const { externals, devExternals } = Utils.getUserConfig
    if (env !== 'local') return externals || {}
    return devExternals ? devExternals : externals || {}
}
export default Utils.getUserConfig.externals || {}
