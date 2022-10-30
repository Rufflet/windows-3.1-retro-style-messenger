import { InputProps } from "components/input/input";
import Block from "core/Block";
import "./controlledInput.css";

interface ControlledInputPropsPropsEvents extends ControlledInputProps {
  events: {
    focus?: (e: Event) => void;
    blur?: (e: Event) => void;
  };
}

interface ControlledInputProps extends InputProps {
  label: string;
}

export class ControlledInput extends Block<ControlledInputPropsPropsEvents> {
  static componentName = "ControlledInput";

  constructor(props: ControlledInputProps) {
    super({ ...props, events: { focus: props.onFocus, blur: props.onBlur } });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="controlled-input">
        {{#if label}}
          <label for={{id}} class="controlled-input__label">{{label}}</label>
        {{/if}}
        {{#if textarea}}
          {{{Textarea
            id=id
            name=name
            type=type
            value=value
            placeholder=placeholder
            onFocus=onFocus
            onBlur=onBlur
            attrs=attrs
          }}}
        {{else}}
          {{{Input
            id=id
            name=name
            type=type
            value=value
            placeholder=placeholder
            onFocus=onFocus
            onBlur=onBlur
            attrs=attrs
          }}}
        {{/if}}
        
        {{{ErrorComponent ref="errorRef" text=error}}}
      </div>
    `;
  }
}
