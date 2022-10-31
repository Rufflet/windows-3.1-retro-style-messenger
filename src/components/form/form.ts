import Block from "core/Block";
import "./form.css";

interface FormPropsWithEvents extends Omit<FormProps, "onSubmit"> {
  events: {
    submit: EventHandler;
  };
}

interface FormProps {
  class?: string;
  onSubmit: () => void;
}

export class Form extends Block<FormPropsWithEvents> {
  static componentName = "Form";

  constructor({ onSubmit, ...props }: FormProps) {
    super({ ...props, events: { submit: onSubmit } });
  }

  protected render(): string {
    // language=hbs
    return `
      <form class="{{class}}">
        <div class="layout" data-slot=1></div>
      </form>
    `;
  }
}
