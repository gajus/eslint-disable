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
      env: {
        "bar/foobar": true,
        "es6": true,
      },
      rules: {
        'bar/baz': 1,
        foo: 1,
      },
      overrides: [{
        files: ["*.js"],
        rules: {
          sample: 2
        },       
        env: {
          "bar/foobar": false,
        },
        processor: "bar/process",
      }]
    }, ['bar']),
    {
      plugins: [],
      env: {
        "es6": true,
      },
      rules: {
        foo: 1,
      },
      overrides: [{
        files: ["*.js"],
        rules: {
          sample: 2
        },       
        env: {}
      }]
    },
  );
});
