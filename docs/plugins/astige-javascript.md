# astige-javascript

The Astige JavaScript ESLint plugin. See [README.md](../../README.md) for installation instructions.

---

## Rules

### `fta-complexity-could-be-better` and `fta-complexity-needs-improvement`

Triggers when the file's FTA (Fast TypeScript Analyzer) score is between specified thresholds and when the file's FTA score exceeds threshold respectively.

**Configuration**

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

**About FTA**

FTA (Fast TypeScript Analyzer) is a Rust-based static analysis tool that calculates code complexity metrics. Learn more at [ftaproject.dev](https://ftaproject.dev).

**Inspiration**

[sgb-io/fta#193](https://github.com/sgb-io/fta/issues/193)

---

### `no-export-as`

Disallows using the `as` keyword in export statements, enforcing direct named exports:

**❌ Incorrect:**

```typescript
export { foo as bar };
```

**✅ Correct:**

```typescript
export { foo };
```

---

### `no-import-as`

Disallows using the `as` keyword in import statements, enforcing direct named imports:

**❌ Incorrect:**

```typescript
import { foo as bar } from "module";
```

**✅ Correct:**

```typescript
import { foo } from "module";
```

---

### `no-tsx-without-jsx`

Ensures JSX presence in `.tsx` files to maintain clear file type distinctions in TypeScript projects:

**❌ Incorrect:**

```tsx
// utility.tsx
export function utility() {
  return 42;
} // Should be utility.ts
```

**✅ Valid (contains JSX):**

```tsx
// myComponent.tsx
const MyComponent = () => <div>Hello</div>;
```

**Inspiration**

[jsx-eslint/eslint-plugin-react#3843](https://github.com/jsx-eslint/eslint-plugin-react/issues/3843)
