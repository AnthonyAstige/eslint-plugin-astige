import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { PluginConfig } from "../../sharedTypes";

const rules = {};
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
