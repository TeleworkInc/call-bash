# call-bash
A simple utility for using `child_process.spawn` inside of a Promise wrapper.

Allows for the `await call(...)` pattern, initially developed to play nice with the `ora` package, i.e.:

```javascript
const ora = require('ora');
const {
    call,
    sequential
} = require('call-bash');

async function test() {
    const spinner = ora('Starting...').start();

    try {
        await call('do-task arg1 arg2');
    } catch (e) {
        return spinner.fail('Something went wrong!');
    }

    spinner.succeed('All done!');
}
```

# Examples

```javascript
const spinner = ora('Waiting...').start();
await call('sleep 1');
spinner.succeed('All done!');
```
Will call bash (non-blocking) and run the spinner for 1 second, then exit.

```javascript
const spinner = ora('Waiting...').start();
await sequential([
    'echo "Hello"',
    'echo "World"'
]);
spinner.succeed('All done!');
```

Outputs:

```
"Hello"
"World"
✔ All done!
```

# Source

The package simply wraps the `child_process.spawn` call in a Promise which is
resolved on exit and rejected on error.  Multiple commands may be passed in, and
they will be executed in sequential order.

`index.js`
```javascript
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
```

# Footnotes

The options `{ stdio: 'inherit' }` are passed to `spawn`, so stdout will be
visible. This is not configurable for the sake of simplicity (the only
arguments) `callBash` takes are commands).