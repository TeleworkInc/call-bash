const callBash = require('..');
const ora = require('ora');

(async function() {
    let spinner = ora('Testing sleep delay...').start();
    await callBash('sleep 1');
    spinner.succeed('All done!');

    spinner = ora('Testing stdin...').start();
    await callBash(
        'sleep 1',
        'echo Message 1',
        'sleep 1',
        'echo Message 2'
    );
    spinner.stop();

    spinner = ora('Testing error...').start();
    try {
        await callBash(
            'sleep 1',
            'exit 1',
        );
    } catch (e) {
        spinner.fail('Uh-oh, something went wrong!');
        await callBash('sleep 1');
    }

    spinner = ora('Testing success...').start();
    await callBash('sleep 1');
    spinner.succeed('Nothing broke!');
})();