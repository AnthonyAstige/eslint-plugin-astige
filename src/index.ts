import { ftaComplexityCouldBeBetter, ftaComplexityNeedsImprovement } from "./rules/ftaComplexity";
import { maxTokensPerFile } from "./rules/maxTokensPerFile";
import { noImportAs } from "./rules/noImportAs";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx";

/*
 // TODO: Inject these rules form my main repository as the recommended
    rules: {
      "astige/fta-complexity-could-be-better": [
        "warn",
        { "when-above": 55, "when-at-or-under": 75 },
      ],
      "astige/fta-complexity-needs-improvement": [
        SEVERITY.ERROR,
        { "when-above": 75 },
      ],
      "astige/max-tokens-per-file": [
        SEVERITY.WARN,
        {
          js: 2_000,
          ts: 2_000,
          tsx: 2_000,
        },
      ],
      "astige/no-import-as": SEVERITY.ERROR,
      "astige/no-tsx-without-jsx": SEVERITY.ERROR,
    },
*/
export const rules = {
  "no-tsx-without-jsx": noTsxWithoutJsx,
  "no-import-as": noImportAs,
  "max-tokens-per-file": maxTokensPerFile,
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
};
// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Remove all use from my repo, remove local instances of them, ...
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
