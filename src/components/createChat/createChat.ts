import { Block, validate, Validator } from "core";

import "./createChat.css";

export interface CreateChatProps {
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default class CreateChat extends Block<CreateChatProps> {
  static componentName = "CreateChat";

  protected getStateFromProps(props: CreateChatProps) {
    this.state = {
      values: {
        chatTitle: "",
      },
      errors: {
        chatTitle: "",
      },
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      createChat: this.onCreateChat.bind(this),
      close: () => this.props.onClose(),
      ...props,
    };
  }

  isFormValid() {
    const { newState, isValid } = validate(
      this.state.values,
      this.state.errors,
      this
    );

    this.setState(newState);
    return isValid;
  }

  onFocus(e: Event) {
    const input = e.target as HTMLInputElement;
    const { value, name } = input;

    const errorText = Validator(name, value);
    this.refs[name].refs.errorRef.setProps({ text: errorText });
  }

  onBlur(e: Event) {
    const input = e.target as HTMLInputElement;
    const { value, name } = input;

    const errorText = Validator(name, value);
    this.refs[name].refs.errorRef.setProps({ text: errorText });
  }

  onCreateChat() {
    if (this.isFormValid()) {
      this.props.onCreate(this.state.values.chatTitle);
      this.props.onClose();
    }
  }

  protected render(): string {
    const { errors, values } = this.state;

    // language=hbs
    return `
      <div class="create-chart__wrapper">
        {{#Layout class="create-chat" }}
          {{#WindowLayout title="Создать чат" }}
            {{#Form onSubmit=createChat}}
              {{{ControlledInput
                label="Имя чата:"
                id="chatTitle"
                name="chatTitle"
                value="${values.chatTitle}"
                error="${errors.chatTitle}"
                type="text"
                ref="chatTitle"
                placeholder="Введите имя чата"
                onFocus=onFocus
                onBlur=onBlur
              }}}
              <div class="align-center">
                {{{Button text="Создать" type="submit"}}}
                {{{Button text="Отмена" onClick=close}}}
              </div>
            {{/Form}}
          {{/WindowLayout}}
        {{/Layout}}
        </div>
      </div>
    `;
  }
}
