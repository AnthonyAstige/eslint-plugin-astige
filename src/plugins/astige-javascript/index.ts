import { type FlatConfig, type SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { ERROR, WARN } from "../../severityConstants";
import { ftaComplexityCouldBeBetter, ftaComplexityNeedsImprovement } from "./rules/ftaComplexity/ftaComplexity";
import { noExportAs } from "./rules/noExportAs/noExportAs";
import { noImportAs } from "./rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx/noTsxWithoutJsx";

const rules = {
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
  "no-export-as": noExportAs,
  "no-import-as": noImportAs,
  "no-tsx-without-jsx": noTsxWithoutJsx,
};
// TODO: Improve this pattern overall and apply to all sub-plugins

// TODO: Put rule types in here somehow from the actual rules so we config them right?
// TODO: * Apply to all rules?
const PLUGIN_NAME = "astige-javascript";
type PrefixedRuleName = `${typeof PLUGIN_NAME}/${keyof typeof rules}`;
type JavascriptRuleEntryObject = {
  [K in PrefixedRuleName]: SharedConfig.RuleEntry;
};

const ruleConfigs: JavascriptRuleEntryObject = {
  "astige-javascript/fta-complexity-could-be-better": [
    WARN,
    { "when-above": 55, "when-at-or-under": 75 },
  ],
  "astige-javascript/fta-complexity-needs-improvement": [
    ERROR,
    { "when-above": 75 },
  ],
  "astige-javascript/no-export-as": ERROR,
  "astige-javascript/no-import-as": ERROR,
  "astige-javascript/no-tsx-without-jsx": ERROR,
};

export const astigeJavascriptPlugin: FlatConfig.Plugin = { rules: rules };
export const astigeJavascriptConfig: FlatConfig.Config = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME]: astigeJavascriptPlugin },
  rules: ruleConfigs,
};
