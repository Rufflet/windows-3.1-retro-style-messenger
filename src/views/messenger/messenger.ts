import { Block } from "core";
import { ChatListItemProps } from "../../components/chatListItem/chatListItem";
import { Message } from "../../components/chat/chat";
import "./messenger.css";

interface MessengerPageProps {
  avatar?: string;
  name?: string;
  chatList?: ChatListItemProps[];
  messages?: Message[];
}

export class MessengerPage extends Block {
  constructor(props: MessengerPageProps) {
    super({
      ...props,
    });
  }

  render() {
    // language=hbs
    return `
      {{#Layout class="messenger-page"}}
        {{#WindowLayout title="Мессенджер"}}
          <div class="messenger-layout">
            <div class="messenger-layout__menu-bar menu-bar">
              <div class="menu-bar__item">
                <a href="/profile">
                  <span class="text-underlined">П</span>рофиль
                </a>
              </div>
              <div class="menu-bar__item">
                <span class="text-underlined">Н</span>астройки
              </div>
              <div class="menu-bar__item">
                <span class="text-underlined">В</span>ид
              </div>
              <div class="menu-bar__item">
                П<span class="text-underlined">о</span>мощь
              </div>
            </div>
            <div class="messenger-layout__content">
              <div class="chat-list">
                {{#each chatList}}
                  {{{ChatListItem
                    avatar=this.avatar
                    name=this.name
                    message=this.message
                    time=this.time
                    count=this.count
                  }}}
                {{/each}}
              </div>
              <div class="chat-content">
                {{{Chat
                  name=name
                  avatar=avatar
                  messages=messages
                }}}
              </div>
            </div>
          </div>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}
