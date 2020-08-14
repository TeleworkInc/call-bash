/**
 * @license MIT
 */
/**
 * @fileoverview
 * The entry point for this package.
 *
 * @author Christian Lewis
 */
const { spawn } = require('child_process');

const DEFAULTS = {
  shell: true,
  stdio: 'inherit',
};

/**
 * Execute a sequence of shell commands.
 *
 * @param {...string} cmds
 * The commands to run in sequential order, i.e. `shell('echo hello world',
 * 'echo 42')`.
 *
 * @return {Promise}
 * A Promise that will resolve when call is finished, or reject on error.
 */
const shell = async (...cmds) => {
  for (let cmd of cmds) {
    cmd = cmd.split(' ');
    await new Promise((resolve, reject) => {
      spawn(cmd.shift(), cmd, global.SPAWN_OPTIONS || DEFAULTS)
          .on(
              'exit',
              (code) => code == 0
                    ? resolve()
                    : reject(new Error('Exited with code: ' + code)),
          );
    });
  }
  /** Write newline to prevent visual clutter. */
  console.log();
};

module.exports = shell;
