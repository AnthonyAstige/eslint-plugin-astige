import { globalIgnores } from "eslint/config";
import { type PluginConfigs } from "../../sharedTypes";

const astigeIgnoreConfigs: PluginConfigs<[], { string: unknown }> = [
  globalIgnores([
    "out/**",
    ".data/**",
    ".next-prod/**",
    ".next/**",
    ".next-dev/**",
    "package-lock.json",
    "next-env.d.ts",
    ".aider.chat.history.md",
  ]),
];

export { astigeIgnoreConfigs };
