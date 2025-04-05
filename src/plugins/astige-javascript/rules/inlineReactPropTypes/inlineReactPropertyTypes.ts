// import type { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../../../../createRule";

export const inlineReactPropertyTypes = createRule({
  create(context) {
    console.log("CREATING");
    return {
      TSTypeAliasDeclaration(node) {
        // Check if parent is a TSModuleBlock (namespace) or TSInterfaceBody (interface)
        const parent = node.parent;
        if (
          parent.type === "TSModuleBlock"
          || parent.type === "TSInterfaceBody"
        ) {
          return;
        }

        // Check if this type is used in a React component
        const references = context.sourceCode.getScope(node).references;
        const isUsedInComponent = references.some((ref) => {
          const parentInner = ref.identifier.parent;

          // Check if used in function/arrow function parameters
          if (parentInner.type === "TSTypeReference") {
            // Handle arrow function parameters
            if (
              parentInner.parent.type === "TSTypeAnnotation"
              && parentInner.parent.parent.type === "Identifier"
              && parentInner.parent.parent.parent.type === "ArrowFunctionExpression"
            ) {
              return true;
            }

            // Handle regular function parameters
            if (
              parentInner.parent.type === "TSParameterProperty"
              || parentInner.parent.type === "Identifier"
            ) {
              const functionLike = parentInner.parent.parent;
              return (
                functionLike.type === "ArrowFunctionExpression"
                || functionLike.type === "FunctionDeclaration"
                || functionLike.type === "FunctionExpression"
              );
            }
          }

          // Check if used in class component props
          if (parentInner.type === "TSTypeReference" && parentInner.parent.type === "TSTypeAnnotation") {
            const classMember = parentInner.parent.parent;
            return classMember.type === "PropertyDefinition";
          }

          // Check if used in JSX element
          if (parentInner.type === "JSXIdentifier") {
            return true;
          }

          return false;
        });

        if (isUsedInComponent) {
          context.report({
            messageId: "inlineProps",
            node,
          });
        }
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
