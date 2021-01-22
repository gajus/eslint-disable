import path from 'path';
import test from 'ava';
import {
  extractConfig,
} from '../../src/eslintDisable';

test('extracts config', (t) => {
  t.like(
    extractConfig({
      rules: {
        foo: 1,
      },
    }),
    {
      rules: {
        foo: [
          1,
        ],
      },
    },
  );
});

test('resolves extends', (t) => {
  t.like(
    extractConfig({
      extends: [
        path.resolve(__dirname, '../fixtures/eslintrc.json'),
      ],
      rules: {
        foo: 1,
      },
    }),
    {
      rules: {
        bar: [
          1,
        ],
        foo: [
          1,
        ],
      },
    },
  );
});
