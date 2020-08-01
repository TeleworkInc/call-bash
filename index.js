const { spawn } = require('child_process');

const STDIO = {
    stdio: 'inherit'
};

const callBash = async (...cmds) => {
    for (let cmd of cmds) {
        cmd = cmd.split(' ');
        await new Promise((resolve, reject) => {
            spawn(cmd.shift(), cmd, STDIO)
                .on('exit', resolve)
                .on('error', reject);
        });
    }
}

module.exports = callBash;