import { type PluginConfigs } from '../../sharedTypes.js';
import { globalIgnores } from 'eslint/config';

const astigeIgnoreConfigs: PluginConfigs<[], {}> = [
  globalIgnores([
    'out/**',
    '.data/**',
    '.next-prod/**',
    '.next-dev/**',
    'package-lock.json',
    'next-env.d.ts',
    '.aider.chat.history.md',
  ]),
];

export { astigeIgnoreConfigs };
