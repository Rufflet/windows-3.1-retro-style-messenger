import Block from "core/Block";

interface StartIconPropsWithEvents extends Omit<StartIconProps, "onClick"> {
  events: {
    click: (e: Event) => void;
  };
}

interface StartIconProps {
  img: string;
  text: string;
  onClick: () => void;
}

export class StartIcon extends Block<StartIconPropsWithEvents> {
  static componentName = "StartIcon";

  constructor({ onClick, ...props }: StartIconProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
      <a class="start-icon" href="javascript:void(0)">
        <img class="start-icon__icon" src="{{img}}" alt="{{text}}">
        <span class="start-icon__text">{{text}}</span>
      </a>
    `;
  }
}
