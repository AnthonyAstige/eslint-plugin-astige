import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";

export const ignoreConfig: FlatConfig.Config = {
  ignores: [
    "out/**",
    ".data/**",
    ".next-prod/**",
    ".next-dev/**",
    "package-lock.json",
    "next-env.d.ts",
  ],
};
