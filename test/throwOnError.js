const test = require('ava');
const callBash = require('..');

test('should not throw on zero code exit', async (t) => {
  try {
    await callBash('exit 0');
  } catch (e) {
    return t.fail();
  }
  t.pass();
});

test('should throw on nonzero exit', async (t) => {
  try {
    await callBash('exit 1');
  } catch (e) {
    return t.pass();
  }
  t.fail();
});

test('should throw on Node failure', async (t) => {
  try {
    await callBash('node ./example/nodeFailure.js');
  } catch (e) {
    return t.pass();
  }
  t.fail();
});