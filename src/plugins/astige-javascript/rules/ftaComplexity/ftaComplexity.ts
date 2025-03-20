import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import { type RuleWithMetaAndName } from '@typescript-eslint/utils/eslint-utils';
import { type RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { type AnalyzedFile, runFta } from 'fta-cli';
import path from 'node:path';

type ComplexityRule = Omit<
  RuleWithMetaAndName<Options, MessageIds>,
  'defaultOptions' | 'name'
>;

type Options = readonly [
  | {
      'when-above': number;
      'when-at-or-under': number;
    }
  | {
      'when-above': number;
    },
];

const MESSAGE_IDS = {
  COMPLEXITY_ERROR: 'complexityError',
} as const;

type MessageIds = (typeof MESSAGE_IDS)[keyof typeof MESSAGE_IDS];

let fileScores: Map<string, number> | undefined;

const complexityRuleConfig: ComplexityRule = {
  create(
    context: Readonly<RuleContext<MessageIds, Options>>,
    [options]: Options,
  ) {
    const scoreMustBeAbove: number = options['when-above'];
    const scoreMustBeAtOrBelow: number | undefined =
      'when-at-or-under' in options ? options['when-at-or-under'] : undefined;

    // Skip virtual files (e.g. "<input>")
    if (context.filename === '<input>') {
      return {};
    }

    return {
      'Program:exit'(node: TSESTree.Program) {
        try {
          // Lazy load the FTA analysis once for the entire codebase
          if (!fileScores) {
            // Note: No ESLint ignored patterns access .... so this will pickup more than we want
            const output = runFta(context.cwd, {
              json: true,
            });
            try {
              const results: AnalyzedFile[] =
                typeof output === 'string' ? JSON.parse(output) : output;
              fileScores = new Map(
                results.map((file) => [
                  path.join(context.cwd, file.file_name),
                  file.fta_score,
                ]),
              );
            } catch {
              return;
            }
          }

          const score = fileScores.get(context.filename);
          if (score === undefined) {
            return;
          }

          const meetsMinThreshold =
            scoreMustBeAbove === undefined || score > scoreMustBeAbove;
          const meetsMaxThreshold =
            scoreMustBeAtOrBelow === undefined || score <= scoreMustBeAtOrBelow;

          if (meetsMinThreshold && meetsMaxThreshold) {
            const firstToken = context.sourceCode.getFirstToken(node);
            if (!firstToken) {
              return;
            }

            context.report({
              data: {
                score: Math.round(score * 10) / 10,
                scoreMustBeAbove,
              },
              messageId: MESSAGE_IDS.COMPLEXITY_ERROR,
              node: firstToken,
            });
          }
        } catch {
          // In case of any unexpected errors, do not throw linting errors.
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Enforce FTA-based file complexity limits',
    },
    messages: {
      [MESSAGE_IDS.COMPLEXITY_ERROR]:
        "File's high FTA complexity score ({{score}}) is above {{scoreMustBeAbove}}.",
    },
    schema: [
      {
        additionalProperties: false,
        anyOf: [
          {
            required: ['when-above'],
            type: 'object',
          },
          {
            required: ['when-at-or-under'],
            type: 'object',
          },
        ],
        properties: {
          'when-above': {
            type: 'number',
          },
          'when-at-or-under': {
            type: 'number',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
};

export const ftaComplexityCouldBeBetter = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`,
)<Options, MessageIds>({
  ...complexityRuleConfig,
  defaultOptions: [{ 'when-above': 50, 'when-at-or-under': 60 }],
  name: 'complexity-could-be-better',
});

export const ftaComplexityNeedsImprovement = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`,
)<Options, MessageIds>({
  ...complexityRuleConfig,
  defaultOptions: [{ 'when-above': 60 }],
  name: 'complexity-needs-improvement',
});
