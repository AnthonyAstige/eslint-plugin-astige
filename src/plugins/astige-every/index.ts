import markdown from "@eslint/markdown";
import importPlugin from "eslint-plugin-import";
import { ERROR, OFF, WARN } from "../../severityConstants";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile";
// import jsxA11yConfig from "eslint-config-canonical/configurations/jsx-a11y";
import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import globals from "globals";

const MAX_TEXT_TOKENS = 3_000;
const MAX_CODE_TOKENS = 2_000;

const PLUGIN_NAME = "astige-every";
const rules = {
  "max-tokens-per-file": maxTokensPerFile,
};

const astigeEveryPlugin: FlatConfig.Plugin = { rules };
// const astigeEveryConfigs: PluginConfigs<[typeof PLUGIN_NAME], typeof rules> = [
const astigeEveryConfigs: FlatConfig.Config[] = [
  // TODO 1. Make work work all file types with a fallback token count
  // TODO 1. * May need a custom parser
  {
    files: ["**/*.md"],
    language: "markdown/commonmark",
    plugins: {
      markdown,
      [PLUGIN_NAME]: astigeEveryPlugin,
    },
    rules: {
      "astige-every/max-tokens-per-file": [
        WARN,
        {
          md: MAX_TEXT_TOKENS,
        },
      ],
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,json}"],
    plugins: { [PLUGIN_NAME]: astigeEveryPlugin },
    rules: {
      "astige-every/max-tokens-per-file": [
        WARN,
        {
          js: MAX_CODE_TOKENS,
          json: MAX_TEXT_TOKENS,
          jsx: MAX_CODE_TOKENS,
          ts: MAX_CODE_TOKENS,
          tsx: MAX_CODE_TOKENS,
        },
      ],
      "no-warning-comments": [
        WARN,
        {
          // Single warn syntax so low priority reminders like `TODO 1.` can remain
          terms: ["TODO:"],
        },
      ],
    },
  },
  // TODO: Move all of this stuff out of the every config ; these rules are not really meant for everything ; I need to get organized
  // TODO: * And when done put back the above PluginConfigs
  {
    files: ["**/*.json"],
    rules: {
      "jsonc/no-comments": OFF,
    },
  },
  /*
  // TODO: Bring this back in ; typing issue I think need to adjust my custom type def
  {
    files: ["** /*.tsx"],
    ...jsxA11yConfig.recommended,
    rules: {
      "jsx-a11y/label-has-associated-control": OFF,
    },
  },
  */
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "canonical/filename-match-regex": [ERROR],
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
  },
  {
    files: ["**/*.{cjs,mjs,js,ts,tsx}"],
    rules: {
      /*
       * ChatGPT query "Adjust this eslint id-match rule's regex to allow snake_case variables also" by Anthony on 2024-02-14
       * * Original: ^[A-Za-z]+(?:[A-Z][a-z]*)*\d*$)|(^[A-Z]+(_[A-Z]+)*(_\d$)*$)|(^(_|\$)$
       * * Updated:  ^[a-zA-Z_$][a-zA-Z0-9_$]*$|^[A-Z]+(_[A-Z0-9]+)*$|^[a-z]+(_[a-z0-9]+)*$
       * ChatGPT comment: '// Adjusted ESLint id-match rule regex to allow camelCase, PascalCase, UPPER_CASE with underscores, and snake_case identifiers'
       *
       * Note: Not really reviewed, as regex complex, but seems to work
       */
      "canonical/id-match": [
        ERROR,
        "^[a-zA-Z_$][a-zA-Z0-9_$]*$|^[A-Z]+(_[A-Z0-9]+)*$|^[a-z]+(_[a-z0-9]+)*$",
      ],
      complexity: [WARN, 8],
      "import/extensions": [
        ERROR,
        {
          pattern: {
            cjs: "always",
            css: "always",
            js: "never",
            mjs: "always",
            ts: "never",
            tsx: "never",
          },
        },
      ],
      "import/group-exports": ERROR,
      "import/no-commonjs": ERROR,
      "import/no-default-export": ERROR, // General concensus is default-exports are bad - https://old.reddit.com/r/javascript/comments/x3hsov/default_exports_in_javascript_modules_are_terrible/
      "import/no-unassigned-import": [
        ERROR,
        {
          allow: ["server-only", "**/*.css"],
        },
      ],
      "max-depth": [WARN, 2],
      "max-lines-per-function": [WARN, 150],
      "no-console": [WARN], // Allow console logs during normal development, plan is to cleanup in cleanup phase
      "no-inline-comments": [OFF], // Allow inline comments for simplicity ; I trust myself
      "no-unreachable": [WARN], // Prevent auto-fix removing unreachable code (race condition?) & actually warn - https://stackoverflow.com/a/74964368
      "unicorn/no-array-reduce": OFF,
    },
  },
  {
    files: ["**/*.{cjs,mjs,js}"],
    rules: {
      "import/extensions": [
        ERROR,
        {
          pattern: {
            cjs: "always",
            js: "always",
            mjs: "always",
          },
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        ERROR,
        {
          assertionStyle: "never",
        },
      ],
      /**
       * Allow various for Prisma since it's permiating our app
       * 1) @typescript-eslint/naming-convention: Variable naming snake_case
       * 2) canonical/id-match: Variable naming snake_case
       */
      "@typescript-eslint/naming-convention": [
        OFF,
        {
          format: ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
        },
      ],
      "@typescript-eslint/no-deprecated": ERROR,
      "@typescript-eslint/no-empty-object-type": [ERROR],
      "@typescript-eslint/no-restricted-types": [
        ERROR,
        {
          types: {
            "React.FC": {
              message: "Use regular function components instead of React.FC",
            },
          },
        },
      ],
      "@typescript-eslint/no-unnecessary-condition": [ERROR],
      "@typescript-eslint/no-unsafe-function-type": [ERROR],
      "@typescript-eslint/no-unused-vars": [
        ERROR,
        {
          // Catch what ts server warns about as an error instead w/args: all
          args: "all",
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-wrapper-object-types": [ERROR],
    },
  },
  {
    files: ["**/*.tsx"],
    rules: {
      // Use camelCase for *.tsx filenames as PascalCase may break HMR (fast reload) in Next.js 🤷
      "canonical/filename-match-exported": [
        ERROR,
        {
          transforms: ["camel"],
        },
      ],
      // Allow className for tailwind
      "react/forbid-component-props": [
        ERROR,
        {
          forbid: ["style"],
        },
      ],
    },
  },
  // TODO: Move this globals somewhere we want it ...main setup or something?
  {
    files: ["**/*.cjs", "**/*.mjs", "**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // Invert to default exports for certain cases
  {
    files: [
      // Next.JS pages (Note: only place actual pages here)
      // * TODO: Check that only pages are in this folder
      "src/pages/**/*.{ts,tsx}", // Next.JS V12 and earlier
      "src/app/**/page.tsx", // Next.JS V13
      // Other plugins expecting a default export
      "eslint.config.ts",
      "jest.config.mjs",
      "next.config.mjs",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "src/types/**/*.d.ts",
    ],
    rules: {
      "import/no-default-export": OFF,
      "import/no-named-export": ERROR,
      "import/prefer-default-export": ERROR,
    },
  },
  // Special cases
  {
    files: [
      "src/app/layout.tsx",
    ],
    rules: {
      "import/no-default-export": OFF,
      "import/no-named-export": OFF,
    },
  },
  {
    files: ["**/*"],
    rules: {
      "jsonc/no-comments": OFF,
    },
  },
  {
    // Disable formatting capability for eslint (use dprint instead for performance even over prettier)
    // * https://old.reddit.com/r/neovim/comments/1f44u1a/eslint_performance_compared_to_vscode_lspeslint/llmhn47/
    // * https://typescript-eslint.io/users/what-about-formatting/#suggested-usage---prettier
    // * https://news.ycombinator.com/item?id=31160722
    files: ["**/*"],
    rules: {
      "jsonc/array-bracket-newline": OFF,
      "jsonc/array-element-newline": OFF,
      "jsonc/indent": OFF,
      "jsonc/key-spacing": OFF,
      "jsonc/object-curly-spacing": OFF,
      "perfectionist/sort-imports": OFF,
      "prettier/prettier": OFF,
    },
  },
  // Disable or adjust slow rules
  // * Found via `TIMING=1 npx eslint`
  {
    plugins: {
      // TODO: Ensure this is correct / fix back to "import/[rule-name]" override everywhere?
      // TODO: * Before I had this named "import" in an attempt to override import from canonical's auto config
      // TODO: ** Not sure if everything was working as intended even
      import: importPlugin,
    },
  },
  {
    files: ["**/*"],
    rules: {
      "@typescript-eslint/no-deprecated": OFF,
      "import/no-cycle": [
        ERROR,
        {
          ignoreExternal: true,
        },
      ],
      "import/no-deprecated": OFF,
    },
  },
];

export { astigeEveryConfigs, astigeEveryPlugin };
