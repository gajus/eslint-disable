/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fp/no-delete */

import {
  Legacy,
} from '@eslint/eslintrc';
import clone from 'clone-deep';

const extractConfig = (baseConfig: any) => {
  const factory = new Legacy.ConfigArrayFactory();

  return factory
    .create(baseConfig)
    .extractConfig()
    .toCompatibleObjectAsConfigFileContent();
};

const disablePlugins = (eslintConfig: any, pluginNames: string[]) => {
  const nextEslintConfig = clone(eslintConfig);

  nextEslintConfig.plugins = nextEslintConfig.plugins.filter((pluginName) => {
    return !pluginNames.includes(pluginName);
  });

  for (const pluginName of pluginNames) {
    for (const [key] of Object.entries(nextEslintConfig.rules)) {
      if (key.startsWith(pluginName + '/')) {
        delete nextEslintConfig.rules[key];
      }
    }
  }

  return nextEslintConfig;
};

export {
  extractConfig,
  disablePlugins,
};
