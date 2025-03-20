import { FlatConfig, SharedConfig } from "@typescript-eslint/utils/ts-eslint";

export type PluginConfig<PluginNames extends string[], Rules extends Record<string, unknown>> = FlatConfig.Config & {
  rules: { [K in `${PluginNames[number]}/${Extract<keyof Rules, string>}`]: SharedConfig.RuleEntry };
};
