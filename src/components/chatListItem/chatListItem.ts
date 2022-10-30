import Block from "core/Block";
import noAvatar from "assets/no-avatar.png";
import { Dispatch, Router } from "core";
import type { LastMessage } from "api/types/chats";

interface ChatListItemPropsEvents extends ChatListItemProps {
  events: {
    click: (e: Event) => void;
  };
}

export interface ChatListItemProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  avatar: string;
  id: number;
  title: string;
  lastMessage: LastMessage;
  unreadCount: number;
  onChatClick: (id: number) => void;
  active: number;
  isActive: boolean;
}

export default class ChatListItem extends Block<ChatListItemPropsEvents> {
  static componentName = "ChatListItem";

  constructor(props: ChatListItemProps) {
    super({
      ...props,
      isActive: props.id === props.active,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const { target } = e;

          const item = (target as HTMLElement).closest(
            "div.chat-list__item"
          ) as HTMLElement;
          if (item) {
            const id = parseInt(item.dataset.id!, 10);
            props.onChatClick(id);
          }
        },
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="chat-list__item {{#if isActive}}active{{/if}}" data-id="{{id}}">
        <div class="chat-list__item-avatar">
          <picture>
            <source srcset="{{avatar}}" width="30" height="30">
            <img src="${noAvatar}" alt="avatar" width="30" height="30">
          </picture>
        </div>
        <div class="chat-list__item-details">
          <div class="name">{{title}}</div>
          <div class="message">{{lastMessage.content}}</div>
        </div>
        <div class="chat-list__item-meta">
          <div class="date">{{lastMessage.time}}</div>
          {{#if unreadCount}}
            <div class="count">
              <span>{{unreadCount}}</span>
            </div>
          {{/if}}
        </div>
      </div>
    `;
  }
}
