import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { ERROR, WARN } from "../../severityConstants";
import { PluginConfig } from "../../sharedTypes";
import { ftaComplexityCouldBeBetter, ftaComplexityNeedsImprovement } from "./rules/ftaComplexity/ftaComplexity";
import { noExportAs } from "./rules/noExportAs/noExportAs";
import { noImportAs } from "./rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx/noTsxWithoutJsx";

const PLUGIN_NAME = "astige-javascript";
const rules = {
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
  "no-export-as": noExportAs,
  "no-import-as": noImportAs,
  "no-tsx-without-jsx": noTsxWithoutJsx,
};

const astigeJavascriptPlugin: FlatConfig.Plugin = { rules: rules };
const astigeJavascriptConfig: PluginConfig<[typeof PLUGIN_NAME], typeof rules> = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME]: astigeJavascriptPlugin },
  rules: {
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
  },
};

export { astigeJavascriptConfig, astigeJavascriptPlugin };
