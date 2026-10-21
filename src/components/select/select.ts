import Block from "core/Block";
import { countryOptions } from "utils/phone";

interface SelectPropsWithEvents extends Omit<SelectProps, "onChange"> {
  events: {
    change: EventHandler;
  };
}

interface SelectProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: EventHandler;
}

export class Select extends Block<SelectPropsWithEvents> {
  static componentName = "Select";

  constructor(props: SelectProps) {
    super({
      ...props,
      events: {
        change: props.onChange || (() => undefined),
      },
    });
  }

  protected render(): string {
    const options = countryOptions(String(this.props.value || "US"));

    // language=hbs
    return `
      <select id="{{id}}" name="{{name}}" class="controlled-input__input">
        ${options}
      </select>
    `;
  }
}
