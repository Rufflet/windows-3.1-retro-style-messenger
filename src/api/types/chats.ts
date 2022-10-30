import { APIError, UserDTO } from "api/types/auth";

export type ChatDTO = {
  id: number;
  title: string;
  avatar: Nullable<string>;
  created_by: number;
  unread_count: number;
  last_message: Nullable<LastMessageDTO>;
};

export type Chat = {
  avatar: string;
  id: number;
  title: string;
  lastMessage: LastMessage;
  unreadCount: number;
};

export type Message = {
  id: number;
  userId: number;
  chatId: number;
  type: string;
  time: string;
  content: string;
  isRead: boolean;
  file: any;
};

export type MessageDTO = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: any;
};
export type LastMessageDTO = {
  user: Omit<UserDTO, "id" | "display_name">;
  time: string;
  content: string;
};

export type LastMessage = Omit<LastMessageDTO, "user">;

export type CreateChatRequest = {
  title: string;
};

export type CreateChatResponseData = {
  id: number;
};

export type DeleteChatRequest = {
  chatId: number;
};

export type DeleteChatResponseData = APIError;

export type GetChatUsersRequest = {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export type GetChatUsersResponse = UserDTO[] | APIError;

export type AddUsersToChatRequest = {
  users: number[];
  chatId: number;
};

export type AddUsersToChatResponseData = APIError;

export type DeleteUsersFromChatRequest = {
  users: number[];
  chatId: number;
};

export type DeleteUserFromChatResponseData = APIError;
