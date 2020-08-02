const { spawn } = require('child_process');

const DEFAULTS = {
    stdio: 'inherit'
};

/**
 * Execute a sequence of shell commands.
 * 
 * @param {string...} cmds
 * The commands to run in sequential order, i.e. `callBash('echo hello world',
 * 'echo 42')`.
 * 
 * @return {Promise}
 * A Promise that will resolve when call is finished, or reject on error.
 */
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