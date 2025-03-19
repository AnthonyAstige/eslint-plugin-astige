export declare const rules: {
    "no-tsx-without-jsx": import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"noJsxInTsx", [], unknown, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
    "no-import-as": import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"noImportAs", [], unknown, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
    "max-tokens-per-file": import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"maxTokens", [{
        [key: string]: number;
    }], unknown, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
    "fta-complexity-could-be-better": import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"complexityError", readonly [{
        "when-above": number;
    } | {
        "when-above": number;
        "when-at-or-under": number;
    }], unknown, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
    "fta-complexity-needs-improvement": import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"complexityError", readonly [{
        "when-above": number;
    } | {
        "when-above": number;
        "when-at-or-under": number;
    }], unknown, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
};
