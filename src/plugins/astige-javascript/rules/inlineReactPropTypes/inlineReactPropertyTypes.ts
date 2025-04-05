import { type TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../../../../createRule";

// Helper function to determine if a function is likely a React component
const isLikelyReactComponent = (
  node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression,
): boolean => {
  // Check if the function name starts with an uppercase letter (component convention)
  if (node.type === "FunctionDeclaration" && node.id) {
    const firstChar = node.id.name.charAt(0);
    if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
      return true;
    }
  }

  // Check if the function is being assigned to a variable with uppercase first letter
  if (
    node.parent.type === "VariableDeclarator"
    && node.parent.id.type === "Identifier"
  ) {
    const firstChar = node.parent.id.name.charAt(0);
    if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
      return true;
    }
  }

  // Check if the function returns JSX
  if (node.body.type === "BlockStatement") {
    // For functions with block bodies, we'd need to analyze the return statements
    // This is a simplified check
    for (const statement of node.body.body) {
      if (
        statement.type === "ReturnStatement"
        && statement.argument?.type === "JSXElement"
      ) {
        return true;
      }
    }
  } else if (
    node.body.type === "JSXElement"
    || node.body.type === "JSXFragment"
    ) {
      // Arrow function with direct JSX return
      return true;
    }

    // Check if the function is being exported (common for components)
    if (
      node.parent.type === "ExportNamedDeclaration"
      || node.parent.parent?.type === "ExportNamedDeclaration"
      || node.parent.type === "ExportDefaultDeclaration"
    ) {
      return true;
    }

    return false;
  };

export const inlineReactPropertyTypes = createRule({
  create(context) {
    const typeAliases = new Map<string, TSESTree.TSTypeAliasDeclaration>();

    return {
      // Check function components with props parameter
      "ArrowFunctionExpression, FunctionDeclaration, FunctionExpression"(
        node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression,
      ) {
        // Skip functions with no parameters
        if (node.params.length === 0) {
          return;
        }

        // Uh skip more functions with no parameters?
        const firstParameter = node.params[0];
        if (!firstParameter) {
          return;
        }

        // Check if the first parameter has a type annotation that references a type alias
        if (
          firstParameter.type === "Identifier"
          && firstParameter.typeAnnotation?.type === "TSTypeAnnotation"
        ) {
          const typeAnnotation = firstParameter.typeAnnotation.typeAnnotation;

          // Check if the type annotation is a reference to a type alias
          if (
            typeAnnotation.type === "TSTypeReference"
            && typeAnnotation.typeName.type === "Identifier"
          ) {
            const typeName = typeAnnotation.typeName.name;

            // Check if this type is in our map of type aliases
            if (typeAliases.has(typeName)) {
              // Check if this is likely a React component
              const isReactComponent = isLikelyReactComponent(node);

              if (isReactComponent) {
                context.report({
                  messageId: "inlineProps",
                  node: firstParameter.typeAnnotation,
                });
              }
            }
          }
        }

        // Check for destructured parameter with type annotation
        if (
          firstParameter.type === "ObjectPattern"
          && firstParameter.typeAnnotation?.type === "TSTypeAnnotation"
        ) {
          const typeAnnotation = firstParameter.typeAnnotation.typeAnnotation;

          // Check if the type annotation is a reference to a type alias
          if (
            typeAnnotation.type === "TSTypeReference"
            && typeAnnotation.typeName.type === "Identifier"
          ) {
            const typeName = typeAnnotation.typeName.name;

            // Check if this type is in our map of type aliases
            if (typeAliases.has(typeName)) {
              // Check if this is likely a React component
              const isReactComponent = isLikelyReactComponent(node);

              if (isReactComponent) {
                context.report({
                  messageId: "inlineProps",
                  node: firstParameter.typeAnnotation,
                });
              }
            }
          }
        }
      },

      // Store all type aliases for later reference
      TSTypeAliasDeclaration(node) {
        typeAliases.set(node.id.name, node);
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: "Enforces inline type definitions for React component props",
    },
    messages: {
      inlineProps: "React component props should be defined inline rather than using a type alias.",
    },
    schema: [],
    type: "suggestion",
  },
  name: "inline-react-prop-types",
});
