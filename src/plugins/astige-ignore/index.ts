import { PluginConfig } from "../../sharedTypes";

export const astigeIgnoreConfig: PluginConfig<[], {}> = {
  ignores: [
    "out/**",
    ".data/**",
    ".next-prod/**",
    ".next-dev/**",
    "package-lock.json",
    "next-env.d.ts",
  ],
};
