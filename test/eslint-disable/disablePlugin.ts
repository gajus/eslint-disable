import test from 'ava';
import {
  disablePlugins,
} from '../../src/eslintDisable';

test('extracts config', (t) => {
  t.deepEqual(
    disablePlugins({
      plugins: [
        'bar',
      ],
      rules: {
        'bar/baz': 1,
        foo: 1,
      },
    }, ['bar']),
    {
      plugins: [],
      rules: {
        foo: 1,
      },
    },
  );
});
