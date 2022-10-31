import Block from "core/Block";
import "./button.css";

interface ButtonPropsWithEvents extends Omit<ButtonProps, "onClick"> {
  events: {
    click: EventHandler;
  };
}

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
}

export class Button extends Block<ButtonPropsWithEvents> {
  static componentName = "Button";

  constructor({ onClick, type, ...props }: ButtonProps) {
    // eslint-disable-next-line no-param-reassign
    if (!type) type = "button";

    super({ ...props, type, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button" type={{type}}>{{text}}</button>
    `;
  }
}
