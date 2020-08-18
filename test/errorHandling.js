const test = require('ava');
const shell = require('..');

test('should not throw for exit code 0', async (t) => {
  try {
    await shell(`
      google-closure-compiler
        -O ADVANCED
        --jscomp_off='*'
        --js ./testcl.js
    `);
  } catch (e) {
    return t.fail();
  }
  t.pass();
});

test('should throw for nonzero exit code', async (t) => {
  try {
    global.SHELL_LOG = true;
    await shell('echo test', 'exit 1');
  } catch (e) {
    return t.pass();
  }
  t.fail();
});

test('should throw on process failure', async (t) => {
  try {
    await shell('node ./example/nodeFailure.js');
  } catch (e) {
    return t.pass();
  }
  t.fail();
});
