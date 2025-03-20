import { SEVERITY } from '../../constants';
import { maxTokensPerFile } from './rules/maxTokensPerFile/maxTokensPerFile';
import {
  type FlatConfig,
  type SharedConfig,
} from '@typescript-eslint/utils/ts-eslint';

const PLUGIN_NAME_EVERY = 'astige-every';
type EveryRuleEntryObject = {
  [K in PrefixedEveryRuleName]: SharedConfig.RuleEntry;
};
type PrefixedEveryRuleName =
  `${typeof PLUGIN_NAME_EVERY}/${keyof typeof everyRules}`;
const everyRules = {
  'max-tokens-per-file': maxTokensPerFile,
};
const everyRuleConfigs: EveryRuleEntryObject = {
  'astige-every/max-tokens-per-file': [
    SEVERITY.WARN,
    {
      js: 2_000,
      ts: 2_000,
      tsx: 2_000,
    },
  ],
};

export const everyPlugin: FlatConfig.Plugin = { rules: everyRules };
// TODO: Setup no-op parser and make work in this config
export const everyConfig: FlatConfig.Config = {
  files: ['**/*.{js,ts,jsx,tsx}'],
  plugins: { [PLUGIN_NAME_EVERY]: everyPlugin },
  rules: everyRuleConfigs,
} as const;
