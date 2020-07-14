const { callBash, callBashSequential } = require('..');
const ora = require('ora');

(async function() {
    const spinner = ora('Waiting...').start();
    await callBash('sleep 1');
    spinner.succeed('All done!');
})();