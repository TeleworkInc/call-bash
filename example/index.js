const { callBash, callBashSequential } = require('..');
const ora = require('ora');

(async function() {
    let failed = false;

    const spinner = ora('Waiting...').start();
    await callBash('sleep 1');
    spinner.succeed('All done!');

    const spinner2 = ora('Round 2...').start();
    await callBashSequential([
        'sleep 1',
        'echo Message 1',
        'sleep 1',
        'echo Message 2'
    ]);
    spinner2.succeed('Success!');

    const spinner3 = ora('Throwing on error...').start();
    try {
        await callBashSequential([
            'sleep 1',
            'exit 1',
        ]);
    } catch (e) {
        return spinner3.fail('Uh-oh, something went wrong!');
    }
    spinner3.succeed('Nothing broke!');
})();