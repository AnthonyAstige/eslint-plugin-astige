// eslint-disable-next-line canonical/filename-match-regex
declare module "eslint-config-canonical/configurations/auto" {
  import { type Linter } from "eslint";

  const config: Linter.Config[];
  export default config;
}

declare module "eslint-config-canonical/configurations/jsx-a11y" {
  import { type Linter } from "eslint";

  type RecommendedConfig = {
    plugins: {
      "jsx-a11y": {
        rules: Record<string, Linter.RuleEntry>;
      };
    };
    rules: Record<string, Linter.RuleEntry>;
  };

  const config: {
    recommended: RecommendedConfig;
  };
  export default config;
}
