const { spawn } = require('child_process');

const DEFAULTS = {
    stdio: 'inherit'
};

const callBash = (cmd, options = DEFAULTS) => new Promise(
    (resolve, reject) => {
        cmd = cmd.split(' ');
        const cmdName = cmd[0];
        const argv = cmd.slice(1);

        spawn(cmdName, argv, options)
            .on('exit', resolve)
            .on('error', reject);
    }
);

const callBashSequential = async (cmds, options) => {
    for (const cmd of cmds) {
        await callBash(cmd, options);
    }
}

module.exports = {
    callBash,
    callBashSequential
}