# eslint-plugin-astige

My personal ESLint plugin collection containing multiple focused plugins with recommended configurations.

## Guiding Principles

This extremely opinionated preset is designed with these key principles in mind:

1. **One Right Way**: The config is intentionally strict and opinionated to encourage consistency across all my projects. There should be minimal ambiguity about how code should be written. This is still JavaScript / TypeScript though, so there will be a fair amount of inherent flexibility.

2. **LLM-Friendly Code**: The rules are optimized for code that is easily processed and understood by large language models (LLMs). This includes:

   - Clear and explicit code patterns
   - Minimal use of complex or ambiguous syntax
   - Consistent formatting and structure
   - Modular and concise for context window management
   - Consistent, predictable code patterns that are easy to parse, simple to extend, and clear in intent

3. **TypeScript Best Practices**: Embrace TypeScript's type system and idioms fully, following TypeScript conventions and best practices wherever practical.

4. Speed - Any included rules should be relatively fast so that they can be run fast across entire codebases with 100's of files in seconds and also on individual files within milliseconds for complete analysis and editor integration.

5. **Technology Foundations**: The preset is built around a carefully curated set of core technologies that provide a stable foundation for development. Current primary influences include:

   1. [Canonical ESLint Config](https://github.com/gajus/eslint-config-canonical)
   2. [T3 stack](https://create.t3.gg/)
      1. [Next.js](https://nextjs.org/)
      2. [PostgreSQL](https://www.postgresql.org/) via [Prisma](https://www.prisma.io/)
      3. [Tailwind](https://tailwindcss.com/)
      4. [tRPC](https://trpc.io/) (+[Zod](https://zod.dev/))
   3. [Aider](https://aider.chat/)
   4. [dprint](https://dprint.dev/) - Fast rust based formatting to minimize that done by ESLint. Dprint config included since there's ESLint rule overlap and dprint should take priority for speed where it can.

6. **Custom Rules When Necessary**: While I prioritize leveraging existing ESLint rules to maintain consistency and development speed, I'm willing to create custom rules when needed to enforce my guiding principles and address specific needs.

## Installation

```bash
npm install eslint-plugin-astige --save-dev
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

## Multiple plugin background

This is structured as a collection of plugins in a single repository to:

1. Allow splitting of plugin loading and processing per file type
2. Enable modular adoption of rules
3. Maintain a single source of truth for all my ESLint configurations
4. Simplify dependency management, versioning, coding of multiple plugins
5. Enable focused development and testing of specific rule sets

## Contributing

While this is primarily my personal preset, I welcome suggestions and discussions about the rules. Please open an issue to start a conversation.

## License

ISC
