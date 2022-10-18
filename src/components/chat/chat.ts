import { Block, Validator } from "core";
import "./chat.css";

export interface ChatProps {
  avatar?: string;
  name: string;
  messages?: Message[];
  onClick: () => void;
}

export interface Message {
  id: number;
  text: string;
  user_id: number;
  date: string;
  read: boolean;
}

export class Chat extends Block {
  static componentName = "Chat";

  constructor(props: ChatProps) {
    const defaultValues = {
      values: {
        message: "",
      },
      errors: {
        message: "",
      },
    };

    super({ ...defaultValues, ...props, events: { click: props.onClick } });
  }

  protected getStateFromProps(props: TemplateProps) {
    this.state = {
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      onMessage: this.onMessage.bind(this),
      ...props,
    };
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

  isFormValid() {
    let isValid = true;
    const newValues = { ...this.props.values };
    const newErrors = { ...this.props.errors };

    Object.keys(this.props.values).forEach((key) => {
      newValues[key] = (
        this.refs[key]
          .getContent()
          .querySelector("textarea") as HTMLTextAreaElement
      ).value;

      const message = Validator(key, newValues[key]);
      if (message) {
        isValid = false;
        newErrors[key] = message;
      }
    });

    const newState = {
      values: newValues,
      errors: newErrors,
    };

    this.setState(newState);

    return isValid;
  }

  onMessage() {
    if (this.isFormValid()) {
      console.log("action/onMessage", this.state.values);
    }
  }

  protected render(): string {
    const { name, avatar, values, errors } = this.props;

    // language=hbs
    return `
      <div class="chat">
        {{#if messages}}
          <div class="chat__header">
            <div class="chat__header-avatar">
              <img src="${avatar}" alt="avatar">
            </div>
            <div class="chat__header-name">
              ${name}
            </div>
          </div>
           <div class="chat__body">
            {{#each messages}}
              <div class="chat__body-message {{#if user_id}}sent{{else}}recieved{{/if}}">
                <div class="chat__body-message-text">{{this.text}}</div>
              </div>
            {{/each}}
          </div>
          <div class="chat__footer">
            <div class="chat__footer-textarea">
              {{{ControlledInput
                textarea=true
                id="message"
                name="message"
                type="textarea"
                ref="message"
                placeholder="Ваше сообщение"
                value="${values.message}"
                error="${errors.message}"
                ref="message"
                onFocus=onFocus
                onBlur=onBlur
              }}}
            </div>
            <div class="chat__footer-submit">
              {{{Button text="Отправить" onClick=onMessage}}}
            </div>
          </div>
        {{else}}
          <div class="chat__body chat__body_no-message">
            <span>Выберите чат</span>
          </div>
        {{/if}}
      </div>
    `;
  }
}
