import { maxTokensPerFile } from "./rules/maxTokensPerFile";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx";

export const rules = {
  "no-tsx-without-jsx": noTsxWithoutJsx,
  "max-tokens-per-file": maxTokensPerFile,
};
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
