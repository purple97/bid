import Utils from '../utils/'
import getRules from './getRules'
export default function() {
    return {
        rules: getRules(Utils.getUserConfig)
    }
}
