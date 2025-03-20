import { FlatConfig, SharedConfig } from "@typescript-eslint/utils/ts-eslint";

export type PluginConfig<PluginName extends string, Rules extends Record<string, unknown>> = FlatConfig.Config & {
  rules: { [K in `${PluginName}/${Extract<keyof Rules, string>}`]: SharedConfig.RuleEntry };
};
