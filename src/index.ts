import { astigeEveryConfigs, astigeEveryPlugin } from "./plugins/astige-every";
import { astigeIgnoreConfigs } from "./plugins/astige-ignore";
import { astigeJavascriptConfigs, astigeJavascriptPlugin } from "./plugins/astige-javascript";
// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const configs = {
  "astige-every": astigeEveryConfigs,
  "astige-ignore": astigeIgnoreConfigs,
  "astige-javascript": astigeJavascriptConfigs,
};

// TODO: Check if the README instructions work for override plugins
const plugins = {
  "astige-every": astigeEveryPlugin,
  "astige-javascript": astigeJavascriptPlugin,
};

const auto: FlatConfig.Config[] = [...astigeJavascriptConfigs, ...astigeEveryConfigs];

export { auto, configs, plugins };
