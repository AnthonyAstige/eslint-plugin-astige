import { ESLintUtils } from "@typescript-eslint/utils";
type Options = readonly [
    {
        "when-above": number;
    } | {
        "when-above": number;
        "when-at-or-under": number;
    }
];
export declare const ftaComplexityCouldBeBetter: ESLintUtils.RuleModule<"complexityError", Options, unknown, ESLintUtils.RuleListener>;
export declare const ftaComplexityNeedsImprovement: ESLintUtils.RuleModule<"complexityError", Options, unknown, ESLintUtils.RuleListener>;
export {};
