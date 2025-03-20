import { everyConfig, everyPlugin } from './plugins/astige-every';
import {
  javascriptConfig,
  javascriptPlugin,
} from './plugins/astige-javascript';
// TODO: Update docs that this is a collection of plugins in a single plugin
// TODO: * Maybe rename this to plugins?
// TODO: * Explain why: Single repository, but allows splitting of plugin loading and processing per file type etc (like plugins do)
// TODO: Split up this file and get organized
// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const configs = {
  every: everyConfig,
  javascript: javascriptConfig,
};

// TODO: Check if the README instructions work for override plugins
const plugins = {
  every: everyPlugin,
  javascript: javascriptPlugin,
};

const auto: FlatConfig.Config[] = [javascriptConfig, everyConfig];

export { auto, configs, plugins };
