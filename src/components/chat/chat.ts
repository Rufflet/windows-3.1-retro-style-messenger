import { Block, validate, Validator } from "core";
import noAvatar from "assets/no-avatar.png";
import { Message } from "api/types/chats";
import { isEqual } from "utils";

import "./chat.css";

export interface ChatProps {
  avatar?: string;
  name: string;
  messages: Message[];
  users: Nullable<User[]>;
  onSearchUser: (login: string) => void;
  onMessage: (message: string) => void;
  onShowAddUserForm: () => void;
  onShowRemoveUserForm: () => void;
}

export class Chat extends Block<ChatProps> {
  static componentName = "Chat";

  protected getStateFromProps() {
    this.state = {
      values: {
        message: "",
      },
      errors: {
        message: "",
      },
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      sendMessage: this.sendMessage.bind(this),
      usersCount: () => this.props.users?.length,
    };
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    setTimeout(() => this.scrollDown());
    return true;
  }

  scrollDown() {
    const chat = this.getContent() as HTMLDivElement;
    const chatBodyEl = chat.querySelector(".chat__body") as HTMLDivElement;
    if (chatBodyEl) chatBodyEl.scrollTop = chatBodyEl.scrollHeight;
  }

  onFocus(e: Event) {
    const input = e.target as HTMLTextAreaElement;
    const { value, name } = input;

    const errorText = Validator(name, value);
    this.refs[name].refs.errorRef.setProps({ text: errorText });
  }

  onBlur(e: Event) {
    const input = e.target as HTMLTextAreaElement;
    const { value, name } = input;

    const errorText = Validator(name, value);
    this.refs[name].refs.errorRef.setProps({ text: errorText });
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

  sendMessage() {
    if (this.isFormValid()) {
      console.log("action/onMessage", this.state.values);
      this.props.onMessage(this.state.values.message);
    }
  }

  protected render(): string {
    const { values, errors } = this.state;

    // language=hbs
    return `
      <div class="chat">
        <div class="chat__header">
          <div class="chat__header-avatar">
            <picture>
              <source srcset="{{avatar}}" width="30" height="30">
              <img src="${noAvatar}" alt="avatar" width="30" height="30">
            </picture>
          </div>
          <div class="chat__header-name">
            <div>{{name}}</div>
            <div>
              {{{Link text="Пользователей:" onClick=onShowRemoveUserForm}}} {{usersCount}}
            </div>
          </div>
          <div class="chat__header-actions">
            {{{Button text="Добавить в чат" onClick=onShowAddUserForm}}}
          </div>
        </div>
        <div class="chat__body">
          {{#if messages}}
            {{#each messages}}
              <div class="chat__body-message {{#whosMessage this.userId}}{{/whosMessage}}">
                <div class="chat__body-message-text">{{this.content}}</div>
              </div>
            {{/each}}
          {{else}}
            <div class="chat__body_no-message">
              <span>Нет сообщений</span>
            </div>
          {{/if}}
        </div>
        <div class="chat__footer">
          {{#Form onSubmit=sendMessage}}
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
              {{{Button text="Отправить" type="submit"}}}
            </div>
          {{/Form}}
        </div>
      </div>
    `;
  }
}
