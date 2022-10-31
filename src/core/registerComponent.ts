import Handlebars, { HelperOptions } from "handlebars";
import Block from "./Block";

interface BlockConstructable<Props = any> {
  new (props: Props): Block;
  componentName: string;
}

export default function registerComponent<Props>(
  Component: BlockConstructable<Props>
) {
  Handlebars.registerHelper(
    Component.componentName || Component.name,
    function (
      this: Props,
      { hash: { ref, ...hash }, data, fn }: HelperOptions
    ) {
      if (!data.root.children) {
        // eslint-disable-next-line no-param-reassign
        data.root.children = {};
      }

      if (!data.root.refs) {
        // eslint-disable-next-line no-param-reassign
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       */
      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === "string") {
          // eslint-disable-next-line no-param-reassign
          hash[key] = hash[key].replace(
            // @ts-expect-error Implicit conversion of a 'symbol' to a 'string' will fail at runtime
            new RegExp(`{{${key}}}`, "i"),
            this[key]
          );
        }
      });

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component; /* .getContent() */
      }

      const contents = fn ? fn(this) : "";

      return `<div data-id="${component.id}">${contents}</div>`;
    }
  );
}
