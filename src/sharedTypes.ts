import type { FlatConfig, SharedConfig } from "@typescript-eslint/utils/ts-eslint";

export type PluginConfigs<PluginNames extends string[], Rules extends Record<string, unknown>> = Array<
  FlatConfig.Config & {
    rules?: { [K in `${PluginNames[number]}/${Extract<keyof Rules, string>}`]: SharedConfig.RuleEntry };
  }
>;
