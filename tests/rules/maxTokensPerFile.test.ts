import { RuleTester } from "@typescript-eslint/rule-tester";
import { maxTokensPerFile } from "../../src/plugins/astige-every/rules/maxTokensPerFile/maxTokensPerFile";

jest.mock("gpt-tokenizer/model/gpt-4o", () => ({
  encode: jest.fn((text: string) => {
    // Simple mock that returns 1 token per character
    return Array.from(text);
  }),
}));

const sampleCode = "const x = 1;";

const ruleTester = new RuleTester({});

ruleTester.run("max-tokens-per-file", maxTokensPerFile, {
  valid: [
    {
      code: sampleCode,
      filename: "test.js",
      options: [{ js: sampleCode.length }],
    },
    {
      code: sampleCode,
      filename: "test.ts",
      options: [{ ts: sampleCode.length }],
    },
  ],
  invalid: [
    {
      code: sampleCode,
      filename: "test.ts",
      options: [{ ts: 1 }],
      errors: [
        {
          messageId: "maxTokens",
          data: {
            fileType: "ts",
            maxTokens: 1,
            tokenCount: sampleCode.length,
          },
        },
      ],
    },
    {
      code: sampleCode,
      filename: "test.js",
      options: [{ js: sampleCode.length - 1 }],
      errors: [
        {
          messageId: "maxTokens",
          data: {
            fileType: "js",
            maxTokens: sampleCode.length - 1,
            tokenCount: sampleCode.length,
          },
        },
      ],
    },
  ],
});
