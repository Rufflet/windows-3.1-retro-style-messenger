import { UserDTO } from "api/types/auth";
import {
  Chat,
  ChatDTO,
  LastMessage,
  LastMessageDTO,
  Message,
  MessageDTO,
} from "../api/types/chats";
import { dateTransformer } from "./dateTransformer";

const AVATAR_BASE_URL = "https://ya-praktikum.tech/api/v2/resources";

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    first_name: data.first_name,
    second_name: data.second_name,
    phone: data.phone,
    email: data.email,
    display_name: data.display_name ? data.display_name : "",
    avatar: data.avatar ? `${AVATAR_BASE_URL}${data.avatar}` : "",
  };
};

export const transformLastMessage = (
  msg: Nullable<LastMessageDTO>
): LastMessage => {
  if (msg) {
    return {
      content: msg.content,
      time: dateTransformer(msg.time),
    };
  }
  return {
    content: "",
    time: "",
  };
};

export const transformChats = (data: ChatDTO[] = []): Chat[] =>
  data.map((chat) => ({
    id: chat.id,
    title: chat.title,
    avatar: chat.avatar ? `${AVATAR_BASE_URL}${chat.avatar}` : "",
    unreadCount: chat.unread_count,
    lastMessage: transformLastMessage(chat.last_message),
  }));

export const transformMessage = (message: MessageDTO): Message => ({
  id: message.id,
  userId: message.user_id,
  chatId: message.chat_id,
  type: message.type,
  time: message.time,
  content: message.content,
  isRead: message.is_read,
  file: message.file,
});

export const transformMessages = (data: MessageDTO[] = []): Message[] =>
  data
    .map(transformMessage)
    .sort((messageA, messageB) => (messageA.time > messageB.time ? 1 : -1));
