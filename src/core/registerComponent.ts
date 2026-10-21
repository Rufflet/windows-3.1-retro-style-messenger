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
       * Workaround that substitutes template variables inside blocks.
       */
      (Object.keys(hash) as Array<keyof Props>).forEach((key) => {
        const value = this[key];
        const current = hash[key as string];

        if (value && typeof value === "string") {
          // eslint-disable-next-line no-param-reassign
          hash[key as string] = (current as string).replace(
            new RegExp(`{{${String(key)}}}`, "i"),
            value
          );
        }
      });

      const component = new Component(hash as Props);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component; /* .getContent() */
      }

      const contents = fn ? fn(this) : "";

      return `<div data-id="${component.id}">${contents}</div>`;
    }
  );
}
