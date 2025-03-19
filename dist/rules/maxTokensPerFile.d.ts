import { type Rule } from "eslint";
export declare const maxTokensPerFile: {
    create(context: Rule.RuleContext): {
        Program?: undefined;
    } | {
        Program(node: Rule.Node): void;
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
