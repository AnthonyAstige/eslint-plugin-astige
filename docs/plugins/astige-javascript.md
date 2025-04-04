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

### `inline-react-property-types`

Disallows using a type alias for React component props, enforcing inline type definitions.

**❌ Incorrect:**

```typescript
type SliderProps = {
  readonly label?: string;
};

export const Slider = ({
  label = "Default label",
}: SliderProps) => {
  // ... component logic
};
```

**✅ Correct:**

```typescript
export const Slider = ({
  label = "Default label",
}: {
  readonly label?: string;
}) => {
  // ... component logic
};
```

**Why?**

Using inline types for component props:

- Keeps the component's signature self-contained
- Reduces the need to navigate to find the prop type definition
- Makes refactoring components easier as the props interface is co-located
- Improves readability by keeping prop types visible where they're used
- Encourages thinking about props as part of the component's public API
- Reduces indirection in the codebase
- Makes it easier to see default values alongside their types
