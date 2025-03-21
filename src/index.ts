import { astigeEveryConfigs, astigeEveryPlugin } from "./plugins/astige-every";
import { astigeIgnoreConfigs } from "./plugins/astige-ignore";
import { astigeJavascriptConfigs, astigeJavascriptPlugin } from "./plugins/astige-javascript";
// TODO: Document all the custom rules and pluings in this repository
// TODO: Move all my personal project's eslint configuration into here
import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import canonicalAuto from "eslint-config-canonical/configurations/auto";

const configs = {
  "astige-every": astigeEveryConfigs,
  "astige-ignore": astigeIgnoreConfigs,
  "astige-javascript": astigeJavascriptConfigs,
};

const plugins = {
  "astige-every": astigeEveryPlugin,
  "astige-javascript": astigeJavascriptPlugin,
};

const auto: FlatConfig.Config[] = [
  ...astigeIgnoreConfigs,
  ...canonicalAuto,
  ...astigeEveryConfigs,
  ...astigeJavascriptConfigs,
];

export { auto, configs, plugins };
