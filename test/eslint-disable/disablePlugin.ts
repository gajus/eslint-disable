import test from 'ava';
import {
  disablePlugins,
} from '../../src/eslintDisable';

test('removes plugin', (t) => {
  t.deepEqual(
    disablePlugins(
      {
        env: {
          'bar/foobar': true,
          es6: true,
        },
        overrides: [
          {
            env: {
              'bar/foobar': false,
            },
            files: ['*.js'],
            processor: 'bar/process',
            rules: {
              sample: 2,
            },
          },
        ],
        plugins: ['bar'],
        rules: {
          'bar/baz': 1,
          foo: 1,
        },
      },
      ['bar'],
    ),
    {
      env: {
        es6: true,
      },
      overrides: [
        {
          env: {},
          files: ['*.js'],
          rules: {
            sample: 2,
          },
        },
      ],
      plugins: [],
      rules: {
        foo: 1,
      },
    },
  );
});
test('empty arrays aren\'t added to empty configs', (t) => {
  t.deepEqual(disablePlugins({}, ['bar']), {});
});
