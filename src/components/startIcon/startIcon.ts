import Block from "core/Block";

interface StartIconProps {
  href: string;
  img: string;
  text: string;
  onClick: () => void;
}

export class StartIcon extends Block {
  static componentName = "StartIcon";

  constructor({ href, img, text, onClick }: StartIconProps) {
    super({ href, img, text, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
      <a class="start-icon" href="{{href}}">
        <img class="start-icon__icon" src="{{img}}" alt="{{text}}">
        <span class="start-icon__text">{{text}}</span>
      </a>
    `;
  }
}
