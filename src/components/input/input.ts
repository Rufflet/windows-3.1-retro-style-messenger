import Block from "core/Block";

interface InputPropsWithEvents
  extends Omit<InputProps, "onChange" | "onFocus" | "onBlur"> {
  events: {
    change?: EventHandler;
    blur?: EventHandler;
    focus?: EventHandler;
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
  onBlur?: EventHandler;
  onFocus?: EventHandler;
  onChange?: EventHandler;
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
