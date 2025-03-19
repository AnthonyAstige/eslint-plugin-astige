# eslint-plugin-personal-preset

My personal ESLint preset for all projects, shared in case it's useful to others.

## Guiding Principles

This extremely opinionated preset is designed with two key principles in mind:

1. **One Right Way**: The rules are intentionally strict and opinionated to encourage consistency across all projects. There should be minimal ambiguity about how code should be written.

2. **LLM-Friendly Code**: The rules are optimized for code that is easily processed and understood by large language models (LLMs). This includes:
   - Clear and explicit code patterns
   - Minimal use of complex or ambiguous syntax
   - Consistent formatting and structure

## Installation

```bash
npm install eslint-plugin-personal-preset --save-dev
```

## Usage

Add the preset to your ESLint configuration:

```json
{
  "extends": ["plugin:personal-preset/recommended"]
}
```

Or customize specific rules:

```json
{
  "plugins": ["personal-preset"],
  "rules": {
    "personal-preset/rule-name": "error"
  }
}
```

## Included Rules

The preset includes a curated set of rules covering:

- **Code Clarity**: Rules that ensure code is explicit and easy to understand
- **Consistency**: Rules that enforce consistent patterns across the codebase
- **LLM Optimization**: Rules that make code more accessible to language models
- **Best Practices**: Opinionated rules based on proven patterns and practices

## Contributing

While this is primarily my personal preset, I welcome suggestions and discussions about the rules. Please open an issue to start a conversation.

## License

MIT
