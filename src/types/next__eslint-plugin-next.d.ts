// eslint-disable-next-line canonical/filename-match-regex
declare module "@next/eslint-plugin-next" {
  import { type Linter } from "eslint";

  const plugin: {
    configs: {
      "core-web-vitals": Linter.Config;
      recommended: Linter.Config;
    };
    rules: Record<string, Linter.RuleModule>;
  };

  export default plugin;
}
