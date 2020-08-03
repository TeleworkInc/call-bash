const test = require('ava');
const callBash = require('..');

test('should not throw for exit code 0', async (t) => {
  try {
    await callBash('exit 0');
  } catch (e) {
    return t.fail();
  }
  t.pass();
});

test('should throw for nonzero exit code', async (t) => {
  try {
    await callBash('exit 1');
  } catch (e) {
    return t.pass();
  }
  t.fail();
});

test('should throw on process failure', async (t) => {
  try {
    await callBash('node ./example/nodeFailure.js');
  } catch (e) {
    return t.pass();
  }
  t.fail();
});