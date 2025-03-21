# eslint-plugin-fta

ESLint plugin for FTA (Fast TypeScript Analyzer) complexity analysis. Enforces file-level complexity thresholds based on FTA's scoring system.

## Installation

```bash
npm install eslint-plugin-fta
```

## Usage

Add to your ESLint config:

```js
import typescriptParser from "@typescript-eslint/parser";
import fta from "eslint-plugin-fta";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      fta,
    },
    rules: {
      // Warn when complexity is between 50-60
      "fta/complexity-could-be-better": [
        "warn",
        { "when-above": 50, "when-at-or-under": 60 },
      ],

      // Error when complexity is above 60
      "fta/complexity-needs-improvement": ["error", { "when-above": 60 }],
    },
  },
];
```

## Rules

- `complexity-could-be-better`: Warns when FTA score is between specified thresholds
- `complexity-needs-improvement`: Errors when FTA score exceeds threshold

## About FTA

FTA (Fast TypeScript Analyzer) is a Rust-based static analysis tool that calculates code complexity metrics. Learn more at [ftaproject.dev](https://ftaproject.dev).

## ESLint Docs

For more on ESLint configuration, see [eslint.org](https://eslint.org).

# eslint-plugin-no-named-import-alias

ESLint plugin to enforce direct named imports without aliases

## Installation

```bash
npm install eslint-plugin-no-named-import-alias --save-dev
```

## Usage

Add the plugin to your ESLint configuration:

```json
{
  "plugins": ["eslint-plugin-no-named-import-alias"],
  "rules": {
    "eslint-plugin-no-named-import-alias/no-import-as": "error"
  }
}
```

## Rules

### no-import-as

Disallows using the `as` keyword in import statements, enforcing direct named imports.

❌ Incorrect:

```typescript
import { foo as bar } from "module";
```

✅ Correct:

```typescript
import { foo } from "module";
```

## Why?

Using direct named imports:

- Easier to search for uses in codebase
- Maintains codebase consistency
- Reduces indirection and hence cognitive overhead

# eslint-plugin-no-tsx-without-jsx

An ESLint plugin that enforces JSX presence in `.tsx` files to maintain clear file type distinctions in TypeScript projects.

## Why?

Using `.tsx` extensions for files without JSX can cause confusion and inconsistency. This plugin ensures that `.tsx` files contain JSX elements

## Installation

```bash
npm install eslint-plugin-no-tsx-without-jsx --save-dev
```

## Usage

1. Add to your ESLint configuration:

```json
{
  "plugins": ["no-tsx-without-jsx"],
  "rules": {
    "no-tsx-without-jsx/no-tsx-without-jsx": "error"
  }
}
```

2. Example valid/invalid usage:

✅ Valid (contains JSX):

```tsx
// myComponent.tsx
const MyComponent = () => <div>Hello</div>;
```

❌ Invalid (no JSX):

```tsx
// utility.tsx
export function utility() {
  return 42;
} // Should be utility.ts
```

## Inspiration

This plugin was inspired by the discussion in [jsx-eslint/eslint-plugin-react#3843](https://github.com/jsx-eslint/eslint-plugin-react/issues/3843)

## Related

- [ESLint](https://eslint.org/) - Pluggable JavaScript linter
- [TypeScript ESLint](https://typescript-eslint.io/) - TypeScript support for ESLint
