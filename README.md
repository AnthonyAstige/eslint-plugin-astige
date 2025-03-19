# eslint-plugin-astige

My personal ESLint plugin containing a recommended configuration of existing and custom rules.

You can take the whole things or just some of the custom rules.

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
      1. [PostgreSQL](https://www.postgresql.org/) via [Prisma](https://www.prisma.io/)
      2. [Tailwind](https://tailwindcss.com/)
      3. [tRPC](https://trpc.io/) (+[Zod](https://zod.dev/))
   3. [Aider](https://aider.chat/)
   4. [dprint](https://dprint.dev/) - Fast rust based formatting to minimize that done by ESLint. Dprint config included since there's ESLint rule overlap and dprint should take priority for speed where it can.

6. **Custom Rules When Necessary**: While I prioritize leveraging existing ESLint rules to maintain consistency and development speed, I'm willing to create custom rules when needed to enforce my guiding principles and address specific needs.

## Installation

```bash
npm install eslint-plugin-astige --save-dev
```

## Usage (`eslint.config.ts`)

Add the preset to your ESLint configuration. You can use the recommended rules as-is or customize specific rules:

```typescript
import astige from "eslint-plugin-astige";

export default [
  {
    plugins: {
      astige,
    },
    rules: {
      // Optionally: Take all the preset recommended rule config
      ...astige.configs.recommended.rules,
      // Optionally: Take or override specific rules
      "astige/no-tsx-without-jsx": "error",
    },
  },
];
```

## Contributing

While this is primarily my personal preset, I welcome suggestions and discussions about the rules. Please open an issue to start a conversation.

## License

ISC
