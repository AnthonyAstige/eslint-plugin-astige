import nextPlugin from "@next/eslint-plugin-next";
import { type PluginConfigs } from "../../sharedTypes";

const astigeNextConfigs: PluginConfigs<[], { string: unknown }> = [
  {
    files: ["**/*.{cjs,mjs,js,ts,tsx}"],
    plugins: {
      "@next/eslint-plugin-next": nextPlugin,
    },
    // TODO: Test that these apply in app repository
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];

export { astigeNextConfigs };
