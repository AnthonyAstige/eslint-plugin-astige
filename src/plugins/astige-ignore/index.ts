import { PluginConfigs } from "../../sharedTypes";

const astigeIgnoreConfigs: PluginConfigs<[], {}> = [{
  ignores: [
    "out/**",
    ".data/**",
    ".next-prod/**",
    ".next-dev/**",
    "package-lock.json",
    "next-env.d.ts",
  ],
}];

export { astigeIgnoreConfigs };
