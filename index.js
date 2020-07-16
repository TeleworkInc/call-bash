const { spawn } = require('child_process');

const DEFAULTS = {
    stdio: 'inherit'
};

const call = (cmd, options = DEFAULTS) => new Promise(
    (resolve, reject) => {
        cmd = cmd.split(' ');
        spawn(cmd.shift(), cmd, options)
            .on('exit', resolve)
            .on('error', reject);
    }
);

const sequential = async (cmds, options) => {
    for (const cmd of cmds) {
        await call(cmd, options);
        console.log();
    }
}

module.exports = {
    call,
    sequential
}