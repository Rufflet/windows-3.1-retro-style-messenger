import { Block, Dispatch, Router } from "core";
import { ChatListItemProps } from "components/chatListItem/chatListItem";
import { isEqual, Views, withRouter, withStore } from "utils";
import { sendMessage, createConnection } from "services/webSocket";
import {
  addUserToChat,
  createChat,
  deleteChat,
  deleteUserFromChat,
  getChats,
  getChatUsers,
  searchUser,
} from "services/chats";
import type { Chat, Message } from "api/types/chats";

import "./messenger.css";

interface MessengerPageProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  chats: ChatListItemProps[];
  searchResults: User[];
  chatUsers: Nullable<User[]>;
  messages: Message[];
  addUserError: string | null;
  deleteUserError: string | null;
}

export class MessengerPage extends Block<MessengerPageProps> {
  constructor(props: MessengerPageProps) {
    super({
      ...props,
    });
  }

  protected getStateFromProps() {
    this.state = {
      showCreateChatForm: false,
      showAddUserForm: false,
      showRemoveUserForm: false,
      activeChat: null,
      onChatClick: this.handleChatClick.bind(this),
      toggleCreateChatForm: this.toggleCreateChatForm.bind(this),
      toggleAddUserForm: this.toggleAddUserForm.bind(this),
      toggleRemoveUserForm: this.toggleRemoveUserForm.bind(this),
      goProfile: () => this.props.router.go(Views.Profile),
      createChat: (title: string) => this.props.dispatch(createChat, { title }),
      searchUser: (login: string) => {
        this.props.dispatch(searchUser, {
          login,
          chatId: this.state.activeChat.id,
        });
      },
      addUser: this.handleAddUser.bind(this),
      removeUser: this.handleRemoveUser.bind(this),
      sendMessage: this.sendMessage.bind(this),
      deleteActiveChat: this.handleDeleteActiveChat.bind(this),
    };
  }

  componentDidMount() {
    this.props.dispatch(getChats);
  }

  componentDidUpdate(
    oldProps: MessengerPageProps,
    newProps: MessengerPageProps
  ): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    return true;
  }

  toggleCreateChatForm() {
    if (!this.state.showCreateChatForm)
      this.setState({
        ...this.state,
        showCreateChatForm: true,
      });
    else
      this.setState({
        ...this.state,
        showCreateChatForm: !this.state.showCreateChatForm,
      });
  }

  toggleAddUserForm() {
    if (!this.state.showAddUserForm)
      this.setState({
        ...this.state,
        showAddUserForm: true,
      });
    else
      this.setState({
        ...this.state,
        showAddUserForm: !this.state.showAddUserForm,
      });
  }

  toggleRemoveUserForm() {
    if (!this.state.showRemoveUserForm)
      this.setState({
        ...this.state,
        showRemoveUserForm: true,
      });
    else
      this.setState({
        ...this.state,
        showRemoveUserForm: !this.state.showRemoveUserForm,
      });
  }

  handleChatClick(chatId: number) {
    this.props.dispatch({ messages: [] });

    const currentChat = this.props.chats.find(
      (chat: Chat) => chat.id === chatId
    ) as Chat;

    this.props.dispatch(createConnection, { chatId });

    this.props.dispatch(getChatUsers, {
      chatId,
    });

    const newState = {
      ...this.state,
      activeChat: currentChat,
    };

    this.setState(newState);
  }

  handleAddUser(id: number) {
    this.props.dispatch(addUserToChat, {
      users: [id],
      chatId: this.state.activeChat.id,
    });
    this.toggleAddUserForm();
  }

  handleRemoveUser(userId: number) {
    this.props.dispatch(deleteUserFromChat, {
      users: [userId],
      chatId: this.state.activeChat.id,
    });
  }

  handleDeleteActiveChat() {
    this.props.dispatch(deleteChat, {
      chatId: this.state.activeChat.id,
    });

    this.setState({
      ...this.state,
      activeChat: null,
    });
  }

  sendMessage(message: string) {
    console.log("send message ", message);
    this.props.dispatch(sendMessage, { message });
  }

  render() {
    // language=hbs
    return `
      {{#Layout class="messenger-page"}}
        {{#if showCreateChatForm }}
          {{{CreateChat
            onClose=toggleCreateChatForm
            onCreate=createChat
          }}}
        {{/if}}
        {{#if showAddUserForm }}
          {{{AddUser
            onClose=toggleAddUserForm
            onSearchUser=searchUser
            searchResults=searchResults
            onAddUser=addUser
            error=addUserError
          }}}
        {{/if}}
        {{#if showRemoveUserForm }}
          {{{RemoveUser
            onClose=toggleRemoveUserForm
            onRemoveUser=removeUser
            users=chatUsers
            error=removeUserError
          }}}
        {{/if}}
        {{#WindowLayout title="Мессенджер"}}
          <div class="messenger-layout">
            <div class="messenger-layout__menu-bar menu-bar">
              <div class="menu-bar__item">
                {{{Link text="<span class='text-underlined'>С</span>оздать чат" onClick=toggleCreateChatForm}}}
              </div>
              {{#if activeChat}}
                <div class="menu-bar__item">
                  {{{Link text="<span class='text-underlined'>У</span>далить активный чат" onClick=deleteActiveChat}}}
                </div>
              {{/if}}
              <div class="menu-bar__item">
                {{{Link text="<span class='text-underlined'>П</span>рофиль" onClick=goProfile}}}
              </div>
            </div>
            <div class="messenger-layout__content">
              <div class="chat-list">
                {{#each chats}}
                  {{{ChatListItem
                    avatar=this.avatar
                    id=this.id      
                    title=this.title
                    lastMessage=this.lastMessage
                    unreadCount=this.unreadCount
                    active=@root.activeChat.id
                    onChatClick=../onChatClick
                  }}}
                {{/each}}
              </div>
              <div class="chat-content">
                {{#if activeChat}}
                  {{{Chat
                    name=activeChat.title
                    avatar=activeChat.avatar
                    messages=messages
                    users=chatUsers
                    onRemoveUser=removeUser
                    onMessage=sendMessage
                    onShowAddUserForm=toggleAddUserForm
                    onShowRemoveUserForm=toggleRemoveUserForm
                  }}}
                {{else}}
                  <div class="chat__body_no-active-chat">
                    <span>Выберите чат</span>
                  </div>
                {{/if}}
              </div>
            </div>
          </div>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    chats: state.chats,
    searchResults: state.searchResults,
    chatUsers: state.chatUsers,
    messages: state.messages,
    addUserError: state.addUserError,
    removeUserError: state.removeUserError,
  };
}

export default withRouter(withStore(MessengerPage, mapStateToProps));
