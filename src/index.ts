// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
import { ftaComplexityCouldBeBetter, ftaComplexityNeedsImprovement } from "./rules/ftaComplexity/ftaComplexity";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile";
import { noImportAs } from "./rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx/noTsxWithoutJsx";

const SEVERITY = {
  OFF: 0,
  WARN: 1,
  ERROR: 2,
} as const;

const PLUGIN_NAME = "astige";

const recommended = {
  rules: {
    [`${PLUGIN_NAME}/fta-complexity-could-be-better`]: [
      SEVERITY.WARN,
      { "when-above": 55, "when-at-or-under": 75 },
    ],
    [`${PLUGIN_NAME}/fta-complexity-needs-improvement`]: [
      SEVERITY.ERROR,
      { "when-above": 75 },
    ],
    [`${PLUGIN_NAME}/max-tokens-per-file`]: [
      SEVERITY.WARN,
      {
        js: 2_000,
        ts: 2_000,
        tsx: 2_000,
      },
    ],
    [`${PLUGIN_NAME}/no-import-as`]: SEVERITY.ERROR,
    [`${PLUGIN_NAME}/no-tsx-without-jsx`]: SEVERITY.ERROR,
  },
};
const configs = {
  recommended,
};

const rules = {
  "no-tsx-without-jsx": noTsxWithoutJsx,
  "no-import-as": noImportAs,
  "max-tokens-per-file": maxTokensPerFile,
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
};

export { configs, rules };
