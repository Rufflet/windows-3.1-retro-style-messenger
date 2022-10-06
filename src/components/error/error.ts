import Block from "core/Block";

interface ErrorComponentProps {
  text?: string;
}

export class ErrorComponent extends Block<ErrorComponentProps> {
  static componentName = "ErrorComponent";

  protected render(): string {
    // language=hbs
    return `
      <span class="controlled-input__error">{{{text}}}</span>
    `;
  }
}
