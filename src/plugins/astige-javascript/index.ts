import { ERROR, WARN } from '../../severityConstants.js';
import { type PluginConfigs } from '../../sharedTypes.js';
import {
  ftaComplexityCouldBeBetter,
  ftaComplexityNeedsImprovement,
} from './rules/ftaComplexity/ftaComplexity.js';
import { noExportAs } from './rules/noExportAs/noExportAs.js';
import { noImportAs } from './rules/noImportAs/noImportAs.js';
import { noTsxWithoutJsx } from './rules/noTsxWithoutJsx/noTsxWithoutJsx.js';
import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const PLUGIN_NAME = 'astige-javascript';
const rules = {
  'fta-complexity-could-be-better': ftaComplexityCouldBeBetter,
  'fta-complexity-needs-improvement': ftaComplexityNeedsImprovement,
  'no-export-as': noExportAs,
  'no-import-as': noImportAs,
  'no-tsx-without-jsx': noTsxWithoutJsx,
};

const astigeJavascriptPlugin: FlatConfig.Plugin = { rules };
const astigeJavascriptConfigs: PluginConfigs<
  [typeof PLUGIN_NAME],
  typeof rules
> = [
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: { [PLUGIN_NAME]: astigeJavascriptPlugin },
    rules: {
      'astige-javascript/fta-complexity-could-be-better': [
        WARN,
        { 'when-above': 55, 'when-at-or-under': 75 },
      ],
      'astige-javascript/fta-complexity-needs-improvement': [
        ERROR,
        { 'when-above': 75 },
      ],
      'astige-javascript/no-export-as': ERROR,
      'astige-javascript/no-import-as': ERROR,
      'astige-javascript/no-tsx-without-jsx': ERROR,
    },
  },
];

export { astigeJavascriptConfigs, astigeJavascriptPlugin };
