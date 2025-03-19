import { maxTokensPerFile } from "./rules/maxTokensPerFile";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx";

export const rules = {
  "no-tsx-without-jsx": noTsxWithoutJsx,
  "max-tokens-per-file": maxTokensPerFile,
};
// TODO: Add recommended config
