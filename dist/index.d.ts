export declare const rules: {
    "no-tsx-without-jsx": import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"noJsxInTsx", [], unknown, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
    "max-tokens-per-file": {
        create(context: import("eslint").Rule.RuleContext): {
            Program?: undefined;
        } | {
            Program(node: import("eslint").Rule.Node): void;
        };
        meta: {
            docs: {
                category: string;
                description: string;
                recommended: boolean;
            };
            messages: {
                maxTokens: string;
            };
            schema: {
                additionalProperties: {
                    type: string;
                };
                type: string;
            }[];
            type: string;
        };
    };
};
