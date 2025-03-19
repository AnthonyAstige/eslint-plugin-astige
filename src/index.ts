import { maxTokensPerFile } from "./rules/maxTokensPerFile";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx";

export const rules = {
  "no-tsx-without-jsx": noTsxWithoutJsx,
  "max-tokens-per-file": maxTokensPerFile,
};
// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Remove all use from my repo, remove local instances of them, ...
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
