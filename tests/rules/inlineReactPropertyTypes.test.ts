import { RuleTester } from "@typescript-eslint/rule-tester";
import { inlineReactPropertyTypes } from "../../src/plugins/astige-javascript/rules/inlineReactPropTypes/inlineReactPropertyTypes";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      parser: "@typescript-eslint/parser",
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run("inline-react-prop-types", inlineReactPropertyTypes, {
  valid: [
    // Valid inline prop types
    {
      code: `
        const MyComponent = (props: { name: string }) => {
          return <div>{props.name}</div>;
        };
      `,
    },
    {
      code: `
        function MyComponent({ name }: { name: string }) {
          return <div>{name}</div>;
        }
      `,
    },
    {
      code: `
        export default function MyComponent({ name = "default" }: { name?: string }) {
          return <div>{name}</div>;
        }
      `,
    },
    // Non-component functions with type aliases are allowed
    {
      code: `
        type Options = { debug: boolean };
        function configure(options: Options) {
          console.log(options.debug);
        }
      `,
    },
    // Class components are not handled by this rule
    {
      code: `
        class MyComponent extends React.Component<Props> {
          render() {
            return <div>{this.props.name}</div>;
          }
        }
      `,
    },
  ],
  invalid: [
    // Function components with type aliases
    {
      code: `
        type Props = { name: string };
        function MyComponent(props: Props) {
          return <div>{props.name}</div>;
        }
      `,
      errors: [{ messageId: "inlineProps" }],
    },
    {
      code: `
        type UserProps = { id: number; name: string };
        const UserProfile = ({ id, name }: UserProps) => (
          <div>{id}: {name}</div>
        );
      `,
      errors: [{ messageId: "inlineProps" }],
    },
    // Destructured props with type references
    {
      code: `
        interface ButtonProps {
          onClick: () => void;
          children: React.ReactNode;
        }
        export const Button = ({ onClick, children }: ButtonProps) => (
          <button onClick={onClick}>{children}</button>
        );
      `,
      errors: [{ messageId: "inlineProps" }],
    },
    // Default exports with type aliases
    {
      code: `
        type ModalProps = { isOpen: boolean };
        export default function Modal({ isOpen }: ModalProps) {
          return isOpen ? <div>Modal</div> : null;
        }
      `,
      errors: [{ messageId: "inlineProps" }],
    },
    // Components with complex type aliases
    {
      code: `
        type ComplexProps = {
          items: Array<{ id: string; value: number }>;
          renderItem: (item: { id: string }) => React.ReactNode;
        };
        const List = ({ items, renderItem }: ComplexProps) => (
          <ul>
            {items.map(item => <li key={item.id}>{renderItem(item)}</li>)}
          </ul>
        );
      `,
      errors: [{ messageId: "inlineProps" }],
    },
  ],
});
