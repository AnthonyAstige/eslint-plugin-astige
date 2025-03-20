import { type FlatConfig, type SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { ERROR, WARN } from "../../severityConstants";
import { ftaComplexityCouldBeBetter, ftaComplexityNeedsImprovement } from "./rules/ftaComplexity/ftaComplexity";
import { noExportAs } from "./rules/noExportAs/noExportAs";
import { noImportAs } from "./rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx/noTsxWithoutJsx";

const javascriptRules = {
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
  "no-export-as": noExportAs,
  "no-import-as": noImportAs,
  "no-tsx-without-jsx": noTsxWithoutJsx,
};
// TODO: Improve this pattern overall and apply to all sub-plugins

// TODO: Put rule types in here somehow from the actual rules so we config them right?
// TODO: * Apply to all rules?
const PLUGIN_NAME_JAVASCRIPT = "astige-javascript";
type PrefixedJavascriptRuleName = `${typeof PLUGIN_NAME_JAVASCRIPT}/${keyof typeof javascriptRules}`;
type JavascriptRuleEntryObject = {
  [K in PrefixedJavascriptRuleName]: SharedConfig.RuleEntry;
};

const javascriptRuleConfigs: JavascriptRuleEntryObject = {
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

export const javascriptPlugin: FlatConfig.Plugin = { rules: javascriptRules };
export const javascriptConfig: FlatConfig.Config = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME_JAVASCRIPT]: javascriptPlugin },
  rules: javascriptRuleConfigs,
};
