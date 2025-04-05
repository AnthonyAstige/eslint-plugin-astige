import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { ERROR, WARN } from "../../severityConstants";
import { ftaComplexityCouldBeBetter, ftaComplexityNeedsImprovement } from "./rules/ftaComplexity/ftaComplexity";
// TODO: Adjust unicorn/prevent-abbreviations eslint config so we can use word prop / props
import { inlineReactPropertyTypes } from "./rules/inlineReactPropTypes/inlineReactPropertyTypes";
import { noExportAs } from "./rules/noExportAs/noExportAs";
import { noImportAs } from "./rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx/noTsxWithoutJsx";

const PLUGIN_NAME = "astige-javascript";
const rules = {
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
  "inline-react-property-types": inlineReactPropertyTypes,
  "no-export-as": noExportAs,
  "no-import-as": noImportAs,
  "no-tsx-without-jsx": noTsxWithoutJsx,
};

const astigeJavascriptPlugin: FlatConfig.Plugin = { rules };
const astigeJavascriptConfigs: FlatConfig.Config[] = [
  {
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
      // TODO: Move to just tsx file type
      "astige-javascript/inline-react-property-types": ERROR,
      "astige-javascript/no-export-as": ERROR,
      "astige-javascript/no-import-as": ERROR,
      "astige-javascript/no-tsx-without-jsx": ERROR,
      "no-restricted-syntax": [
        "error",
        {
          message: "Avoid using throw directly. Consider alternative error handling strategies like assert.",
          selector: "ThrowStatement",
        },
      ],
    },
  },
];

export { astigeJavascriptConfigs, astigeJavascriptPlugin };
