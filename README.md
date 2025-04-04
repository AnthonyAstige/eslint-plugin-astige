# eslint-plugin-astige

My personal ESLint plugin collection containing multiple focused plugins with recommended configurations.

## Installation

```bash
npm install eslint-plugin-astige --save-dev
npx eslint-plugin-astige-init
```

## Usage (`eslint.config.ts`)

Assuming you're using ESLint's new [flat config system](https://eslint.org/blog/2022/08/new-config-system-part-2/) and have TypeScript support, you can add the auto plugin collection to your ESLint configuration and optionally customize:

```typescript
import { type FlatConfig } from "@typescript-eslint/utils/dist/ts-eslint";
import * as astige from "eslint-plugin-astige";

const config: FlatConfig.Config[] = [
  // Get all the recommended configs
  ...astige.auto,
  // Optionally: Take or override specific plugin rules
  {
    plugins: {
      "astige-javascript": astige.plugins.javascript,
    },
    rules: {
      "astige-javascript/no-tsx-without-jsx": "warn",
      "astige-javascript/fta-complexity-needs-improvement": [
        "error",
        { "when-above": 66 },
      ],
    },
  },
];

export default config;
```

### Plugins

- [astige-ignore](./docs/plugins/astige-ignore.md)
- [astige-every](./docs/plugins/astige-every.md) 📏
- [astige-javascript](./docs/plugins/astige-javascript.md) 📏

📏 Contains Custom Rules

## Guiding Principles

This extremely opinionated preset is designed with these key principles:

1. **One Right Way**: The config is intentionally strict and opinionated to encourage consistency across all projects. There should be minimal ambiguity about how code should be written. This is still JavaScript/TypeScript though, so there will be inherent flexibility.
2. **Formatters First**: [Linters are not formatters](https://typescript-eslint.io/users/what-about-formatting/#formatters-vs-linters) and are inherently slower. We rely on formatters for whatever they can do, and minimize the formatting work we have ESLint do.
3. **TypeScript Best Practices**: Fully embrace TypeScript's type system and idioms, following TypeScript conventions and best practices wherever practical.
4. **Fast**: Any included rules should be fast enough to run across entire codebases with hundreds of files in seconds, and on individual files within milliseconds for complete analysis and editor integration.
5. **LLM-Friendly Code**: The rules are optimized for code that is easily processed and understood by large language models (LLMs), emphasizing clear and explicit code patterns with minimal use of complex or ambiguous syntax. The code maintains consistent formatting and structure while being modular and concise for better context window management. This results in consistent, predictable code patterns that are easy to parse, simple to extend, and clear in intent.
6. **Technology Foundations**: The preset is built around a carefully curated set of core technologies that provide a stable development foundation. Current primary influences include:
   1. [dprint](https://dprint.dev/)
   2. [TypeScript](https://www.typescriptlang.org/)
   3. [Canonical ESLint Config](https://github.com/gajus/eslint-config-canonical)
   4. [T3 stack](https://create.t3.gg/)
      1. [Next.js](https://nextjs.org/) (built on [React](https://react.dev/))
      2. [PostgreSQL](https://www.postgresql.org/) (accessed via [Prisma](https://www.prisma.io/))
      3. [tRPC](https://trpc.io/) (typesafe via [Zod](https://zod.dev/))
      4. [Tailwind](https://tailwindcss.com/)
   5. [Aider](https://aider.chat/)
7. **Custom Rules When Necessary**: While I prioritize leveraging existing ESLint rules to maintain consistency and development speed, I'm willing to create custom rules when needed to enforce my guiding principles and address specific needs.
8. **Multiple Sub-Plugins**: The plugin is structured as a collection of sub-plugins in a single repository to enable logical grouping by usage, modular rule adoption, and a single source of truth for all shared ESLint configurations. This approach simplifies dependency management, versioning, and coding of multiple plugins while enabling focused development and testing of specific rule sets.

### The plugins

- [astige-ignore](./docs/plugins/astige-ignore.md)
- [astige-every](./docs/plugins/astige-every.md) 📏
- [astige-javascript](./docs/plugins/astige-javascript.md) 📏

📏 Contains Custom Rules

### Tightly Coupled Non-ESLint Configurations

These base configurations are included and installed with `npx eslint-plugin-astige-init`. They help reduce conflicts and duplication with ESLint rules:

- `dprint.base.json`: Handles code formatting to minimize ESLint formatting rules
- `tsconfig.base.json`: Manages TypeScript compiler options to reduce overlap with ESLint rules

## Contributing

While this is primarily my personal preset, I welcome suggestions and discussions about the rules. Please open an issue to start a conversation.

## License

ISC

## Related

- [ESLint](https://eslint.org/) - Pluggable JavaScript linter
- [TypeScript ESLint](https://typescript-eslint.io/) - TypeScript support for ESLint
