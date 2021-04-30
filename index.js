/**
 * @license MIT
 */
/**
 * @fileoverview
 * The entry point for this package.
 *
 * @author Christian Lewis
 */
const spawn = require('cross-spawn');
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
    /**
     * Trim unnecessary whitespace for convenience.
     */
    cmd = cmd.trim();

    /**
     * Allow multiline commands:
     *
     * await shell(`
        google-closure-compiler
          -O ADVANCED
          --jscomp_off='*'
          --js ./testcl.js
      `);
     *
     * ->
     *
     * google-closure-compiler \
        -O ADVANCED \
        --jscomp_off='*' \
        --js ./testcl.js
     */
    const lines = cmd.split('\n');
    if (lines.length > 1) {
      cmd = lines.map(
          (line, i) => !/\\\s*?$/m.test(line) && i < lines.length - 1
            ? line + ' \\'
            : line,
      ).join('\n');
    }

    cmd = cmd.split(' ');

    await new Promise((resolve, reject) => {
      const thisCmd = cmd.shift();
      const args = cmd;

      if (thisCmd.trim() !== 'echo' && global.SHELL_LOG) {
        console.log(chalk.grey(`\n> ${thisCmd} ${args.join(' ')}\n`));
      }

      spawn(thisCmd, args, global.SHELL_OPTIONS || DEFAULTS)
          .on(
              'exit',
              (code) => {
                if (code === 0) resolve();
                else {
                  if (global.SHELL_STRICT) process.exit(1);
                  else reject(new Error('Exited with code: ' + code));
                }
              },
          );
    });
  }
  /** Write newline to prevent visual clutter. */
  if (global.SHELL_LOG) console.log();
};

module.exports = shell;
