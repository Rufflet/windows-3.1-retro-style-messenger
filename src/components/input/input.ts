import Block from "core/Block";

interface InputPropsWithEvents
  extends Omit<InputProps, "onChange" | "onFocus" | "onBlur"> {
  events: {
    change?: (e: Event) => void;
    blur?: (e: Event) => void;
    focus?: (e: Event) => void;
  };
}

export interface InputProps {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  accept?: string;
  attrs?: string;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

export class Input extends Block<InputPropsWithEvents> {
  static componentName = "Input";

  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        focus: props.onFocus,
        change: props.onChange,
      },
    });
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
        {{#if accept}}
          accept="{{accept}}"
        {{/if}}
        {{attrs}}
      >
    `;
  }
}
