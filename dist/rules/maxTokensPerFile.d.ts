import { TSESLint } from "@typescript-eslint/utils";
type MaxTokensConfig = {
    [key: string]: number;
};
export declare const maxTokensPerFile: TSESLint.RuleModule<"maxTokens", [MaxTokensConfig]>;
export {};
