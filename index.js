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
const chalk = require('chalk');

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
      const thisCmd = cmd.shift();
      const args = cmd;

      if (global.SHELL_LOG) {
        console.log(chalk.grey(`> ${thisCmd} ${args.join(' ')}`));
      }

      spawn(thisCmd, args, global.SPAWN_OPTIONS || DEFAULTS)
          .on(
              'exit',
              (code) => code == 0
                    ? resolve()
                    : reject(new Error('Exited with code: ' + code)),
          );
    });
  }
  /** Write newline to prevent visual clutter. */
  if (global.SHELL_LOG) console.log();
};

module.exports = shell;
