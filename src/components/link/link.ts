import Block from "core/Block";

interface LinkPropsWithEvents extends Omit<LinkProps, "onClick"> {
  events: {
    click: (e: Event) => void;
  };
}

interface LinkProps {
  text: string;
  to: string;
  onClick: () => void;
}

export class Link extends Block<LinkPropsWithEvents> {
  static componentName = "Link";

  constructor({ onClick, ...props }: LinkProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <a class="link" href="{{#if to}}{{to}}{{else}}javascript:void(0){{/if}}">{{{text}}}</a>
    `;
  }
}
