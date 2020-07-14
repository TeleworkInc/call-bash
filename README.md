# call-bash
A simple utility for using `child_process.spawn` inside of a Promise wrapper.

Allows for the `await callBash(...)` pattern, initially developed to play nice with the `ora` package, i.e.:

```javascript
const ora = require('ora');
const {
    callBash,
    callBashSequential
} = require('call-bash');

const spinner = ora('Starting...').start();

try {
    await callBash('do-task arg1 arg2');
} catch (e) {
    spinner.fail('Something went wrong!');
}

spinner.succeed('All done!');
```

# Examples

```javascript
const spinner = ora('Waiting...').start();
await callBash('sleep 1');
spinner.succeed('All done!');
```
Will call bash (non-blocking) and run the spinner for 1 second, then exit.

```javascript
const spinner = ora('Waiting...').start();
await callBashSequential([
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

The package simply wraps the `child_process.spawn` call in a Promise which is resolved on exit and rejected on error.  

`index.js`
```javascript
const callBash = (cmd, options = DEFAULTS) => new Promise(
    (resolve, reject) => {
        cmd = cmd.split(' ');
        spawn(cmd[0], cmd.slice(1), options)
            .on('exit', resolve)
            .on('error', reject);
    }
);

const callBashSequential = async (cmds, options) => {
    for (const cmd of cmds) {
        await callBash(cmd, options);
    }
}
```

# Footnotes

By default, the options `{ stdio: 'inherit' }` are passed, largely so stdout is visible. These can be overridden in the second argument to either `callBash` or `callBashSequential`.