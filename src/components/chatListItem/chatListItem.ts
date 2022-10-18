import Block from "core/Block";

export interface ChatListItemProps {
  avatar?: string;
  name: string;
  message?: string;
  time?: string;
  count?: number | string;
  onClick?: () => void;
}

export class ChatListItem extends Block {
  static componentName = "ChatListItem";

  constructor(props: ChatListItemProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  protected render(): string {
    return `
      <div class="chat-list__item">
        <div class="chat-list__item-avatar">
          <img src="{{avatar}}" alt="avatar">
        </div>
        <div class="chat-list__item-details">
          <div class="name">{{name}}</div>
          <div class="message">{{message}}</div>
        </div>
        <div class="chat-list__item-meta">
          <div class="date">{{time}}</div>
          {{#if count}}
            <div class="count">
              <span>{{count}}</span>
            </div>
          {{/if}}
        </div>
      </div>
    `;
  }
}
