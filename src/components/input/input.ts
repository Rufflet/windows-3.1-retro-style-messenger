import Block from "core/Block";

export interface InputProps {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  attrs?: string;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

export class Input extends Block {
  static componentName = "Input";

  constructor(props: InputProps) {
    super({ ...props, events: { focus: props.onFocus, blur: props.onBlur } });
  }

  protected render(): string {
    // language=hbs
    return `
      <input
        id="{{id}}"
        name="{{name}}"
        class="controlled-input__input"
        type="{{type}}"
        value="{{value}}"
        placeholder="{{placeholder}}"
        {{attrs}}
      >
    `;
  }
}
