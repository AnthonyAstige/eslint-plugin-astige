# astige-javascript

The ESLint Astige JavaScript plugin

## Installation

```bash
npm install eslint-plugin-astige-javascript
```

## Usage

Add to your ESLint config:

```ts
import typescriptParser from "@typescript-eslint/parser";
import { astigeJavascriptConfigs } from "eslint-plugin-astige-javascript";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
    },
    ...astigeJavascriptConfigs,
  },
];
```

## Rules

### `fta-complexity-could-be-better` & `fta-complexity-needs-improvement`

Triggers when FTA score is between specified thresholds and when FTA score exceeds threshold respectively.

```ts
export default [
  {
    rules: {
      // Warn when complexity is between 50-60
      "astige-javascript/complexity-could-be-better": [
        "warn",
        { "when-above": 50, "when-at-or-under": 60 },
      ],
      // Error when complexity is above 60
      "astige-javascript/complexity-needs-improvement": ["error", {
        "when-above": 60,
      }],
    },
  },
];
```

#### About FTA

FTA (Fast TypeScript Analyzer) is a Rust-based static analysis tool that calculates code complexity metrics. Learn more at [ftaproject.dev](https://ftaproject.dev).

### `no-export-as`

Disallows using the `as` keyword in export statements, enforcing direct named exports.

❌ Incorrect:

```typescript
export { foo as bar };
```

✅ Correct:

```typescript
export { foo };
```

### `no-import-as`

Disallows using the `as` keyword in import statements, enforcing direct named imports.

❌ Incorrect:

```typescript
import { foo as bar } from "module";
```

✅ Correct:

```typescript
import { foo } from "module";
```

### `no-tsx-without-jsx`

Ensures JSX presence in `.tsx` files to maintain clear file type distinctions in TypeScript projects.

❌ Incorrect:

```tsx
// utility.tsx
export function utility() {
  return 42;
} // Should be utility.ts
```

✅ Valid (contains JSX):

```tsx
// myComponent.tsx
const MyComponent = () => <div>Hello</div>;
```

#### Inspiration

The `no-tsx-without-jsx` rule was inspired by the discussion in [jsx-eslint/eslint-plugin-react#3843](https://github.com/jsx-eslint/eslint-plugin-react/issues/3843)

## Related

- [ESLint](https://eslint.org/) - Pluggable JavaScript linter
- [TypeScript ESLint](https://typescript-eslint.io/) - TypeScript support for ESLint
