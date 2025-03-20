import type { PluginConfigs } from "../../sharedTypes.js";

const astigeIgnoreConfigs: PluginConfigs<[], {}> = [{
  ignores: [
    "out/**",
    ".data/**",
    ".next-prod/**",
    ".next-dev/**",
    "package-lock.json",
    "next-env.d.ts",
    ".aider.chat.history.md",
  ],
}];

export { astigeIgnoreConfigs };
