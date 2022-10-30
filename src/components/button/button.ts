import Block from "core/Block";
import "./button.css";

interface ButtonPropsWithEvents extends Omit<ButtonProps, "onClick"> {
  events: {
    click: (e: Event) => void;
  };
}

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block<ButtonPropsWithEvents> {
  static componentName = "Button";

  constructor({ onClick, ...props }: ButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button" type="button">{{text}}</button>
    `;
  }
}
