const { call, sequential } = require('..');
const ora = require('ora');

(async function() {
    let failed = false;

    let spinner = ora('Testing sleep delay...').start();
    await call('sleep 1');
    spinner.succeed('All done!');

    spinner = ora('Testing stdin...').start();
    await sequential([
        'sleep 1',
        'echo Message 1',
        'sleep 1',
        'echo Message 2'
    ]);
    spinner.stop();

    spinner = ora('Testing error...').start();
    try {
        await sequential([
            'sleep 1',
            'exit 1',
        ]);
    } catch (e) {
        spinner.fail('Uh-oh, something went wrong!');
        await call('sleep 1');
    }

    spinner = ora('Testing success...').start();
    await call('sleep 1');
    spinner.succeed('Nothing broke!');
})();