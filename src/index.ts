// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { astigeEveryConfigs, astigeEveryPlugin } from "./plugins/astige-every/index.js";
import { astigeIgnoreConfigs } from "./plugins/astige-ignore/index.js";
import { astigeJavascriptConfigs, astigeJavascriptPlugin } from "./plugins/astige-javascript/index.js";

const configs = {
  "astige-every": astigeEveryConfigs,
  "astige-ignore": astigeIgnoreConfigs,
  "astige-javascript": astigeJavascriptConfigs,
};

const plugins = {
  "astige-every": astigeEveryPlugin,
  "astige-javascript": astigeJavascriptPlugin,
};

const auto: FlatConfig.Config[] = [...astigeIgnoreConfigs, ...astigeEveryConfigs, ...astigeJavascriptConfigs];

export { auto, configs, plugins };
