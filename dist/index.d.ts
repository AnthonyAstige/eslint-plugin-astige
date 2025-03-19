export declare const recommended: {
    rules: {
        "astige/fta-complexity-could-be-better": (1 | {
            "when-above": number;
            "when-at-or-under": number;
        })[];
        "astige/fta-complexity-needs-improvement": (2 | {
            "when-above": number;
        })[];
        "astige/max-tokens-per-file": (1 | {
            js: number;
            ts: number;
            tsx: number;
        })[];
        "astige/no-import-as": 2;
        "astige/no-tsx-without-jsx": 2;
    };
};
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
export declare const configs: {
    recommended: {
        rules: {
            "astige/fta-complexity-could-be-better": (1 | {
                "when-above": number;
                "when-at-or-under": number;
            })[];
            "astige/fta-complexity-needs-improvement": (2 | {
                "when-above": number;
            })[];
            "astige/max-tokens-per-file": (1 | {
                js: number;
                ts: number;
                tsx: number;
            })[];
            "astige/no-import-as": 2;
            "astige/no-tsx-without-jsx": 2;
        };
    };
};
