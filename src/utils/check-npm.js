const npm = require('npm');
const inspect = require('util').inspect;

const checkNpm = (name, cb) => {
    // 检测NPM版本
    npm.load(
        {
            loglevel: 'silent'
        },
        function (err) {
            if (npm && npm.registry && npm.registry.log && npm.registry.log.level) {
                npm.registry.log.level = 'silent';
            }
            if (err) {
                return cb(err);
            }
            let silent = true;
            npm.commands.view([name], silent, function (err, data) {
                if (err) return cb(err);
                if (!data) return cb(new Error('No data received.'));
                // eslint-disable-next-line
                for (let p in data) {
                    // eslint-disable-next-line
                    if (!data.hasOwnProperty(p) || !semver.valid(p)) continue;
                    return cb(null, p, data[p]);
                }
                return cb(new Error('Bad data received: ' + inspect(data)));
            });
        }
    );
};

export default checkNpm;
