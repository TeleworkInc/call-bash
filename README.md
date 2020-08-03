# async-shell
A simple utility for using `child_process.spawn` inside of a Promise wrapper.

Allows for the `await shell(...)` pattern, initially developed to play nice with the `ora` package, i.e.:

```javascript
const ora = require('ora');
const shell = require('async-shell');

async function test() {
    const spinner = ora('Starting...').start();

    try {
        await shell('do-task arg1 arg2');
    } catch (e) {
        return spinner.fail('Something went wrong!');
    }

    spinner.succeed('All done!');
}
```

# Examples

```javascript
const spinner = ora('Waiting...').start();
await shell('sleep 1');
spinner.succeed('All done!');
```
Will call bash (non-blocking) and run the spinner for 1 second, then exit.

```javascript
const spinner = ora('Waiting...').start();
await shell(
    'echo "Hello"',
    'echo "World"'
);
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
const shell = async (...cmds) => {
    for (let cmd of cmds) {
        cmd = cmd.split(' ');
        await new Promise((resolve, reject) => {
            spawn(cmd.shift(), cmd, global.SPAWN_OPTIONS || DEFAULTS)
            .on(
                'exit', 
                code => code == 0 
                    ? resolve() 
                    : reject()
            );
        });
    }
}
```

# Footnotes

The options `{ stdio: 'inherit', shell: true }` are passed to `spawn` by default, and stdout
will be visible. For the sake of simplicity, the only arguments `shell` takes
are commands, but you can override this setting with `global.SPAWN_OPTIONS` if
necessary. 