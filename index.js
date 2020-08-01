const { spawn } = require('child_process');

const DEFAULTS = {
    stdio: 'inherit'
};

const callBash = async (...cmds) => {
    for (let cmd of cmds) {
        cmd = cmd.split(' ');
        await new Promise((resolve, reject) => {
            spawn(cmd.shift(), cmd, global.SPAWN_OPTIONS || DEFAULTS)
                .on('exit', resolve)
                .on('error', reject);
        });
    }
}

module.exports = callBash;