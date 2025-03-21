import { RuleTester } from "@typescript-eslint/rule-tester";
import { maxTokensPerFile } from "../../src/plugins/astige-every/rules/maxTokensPerFile/maxTokensPerFile";

// Mock the gpt-tokenizer encode function
// jest.mock("gpt-tokenizer/model/gpt-4o", () => ({
//   encode: jest.fn((text: string) => {
//     // Simple mock that returns 1 token per character
//     return Array.from(text);
//   }),
// }));

const ruleTester = new RuleTester({
  /*
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  */
});

ruleTester.run("max-tokens-per-file", maxTokensPerFile, {
  valid: [
    {
      code: "const x = 1;",
      filename: "test.ts",
      options: [{ ts: 10 }],
    },
    {
      code: "const x = 1;",
      filename: "test.js",
      options: [{ js: 20 }],
    },
    {
      code: "const x = 1;",
      filename: "test.md",
      options: [{ md: 30 }],
    },
  ],
  invalid: [
    {
      code: "const x = 1; const y = 2; const z = 3;",
      filename: "test.ts",
      options: [{ ts: 5 }],
      errors: [
        {
          messageId: "maxTokens",
          data: {
            fileType: "ts",
            maxTokens: "5",
            tokenCount: "35", // 35 characters in the code
          },
        },
      ],
    },
    {
      code: "const x = 1;",
      filename: "test.js",
      options: [{ js: 5 }],
      errors: [
        {
          messageId: "maxTokens",
          data: {
            fileType: "js",
            maxTokens: "5",
            tokenCount: "11", // 11 characters in the code
          },
        },
      ],
    },
    {
      code: "# Markdown content",
      filename: "test.md",
      options: [{ md: 5 }],
      errors: [
        {
          messageId: "maxTokens",
          data: {
            fileType: "md",
            maxTokens: "5",
            tokenCount: "18", // 18 characters in the code
          },
        },
      ],
    },
  ],
});
