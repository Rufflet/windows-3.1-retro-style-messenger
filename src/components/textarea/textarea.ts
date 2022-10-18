import Block from "core/Block";

export interface TextareaProps {
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  attrs?: string;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

export class Textarea extends Block {
  static componentName = "Textarea";

  constructor(props: TextareaProps) {
    super({ ...props, events: { focus: props.onFocus, blur: props.onBlur } });
  }

  protected render(): string {
    // language=hbs
    return `
      <textarea
        id="{{id}}"
        name="{{name}}"
        class="controlled-input__textarea"
        placeholder="{{placeholder}}"
        rows="3"
        cols="33"
        {{attrs}}
      >{{value}}</textarea>
    `;
  }
}
