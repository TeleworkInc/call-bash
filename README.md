# call-bash
A simple utility for using `child_process.spawn` inside of a Promise wrapper.

Allows for the `await callBash('npm init -y')` pattern, initially developed to
play nice with the `ora` package, i.e.:

```
const spinner = ora('Waiting...').start();
await callBash('sleep 1');
spinner.succeed('All done!');
```
Will call bash (non-blocking) and run the spinner for 1 second, then exit.

```
const spinner = ora('Waiting...');
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