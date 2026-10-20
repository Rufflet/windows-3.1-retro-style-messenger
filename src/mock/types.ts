import type { UserDTO } from "api/types/auth";
import type { ChatDTO, MessageDTO } from "api/types/chats";

export type StoredUser = UserDTO & { password: string };

export type MockDatabase = {
  users: StoredUser[];
  sessionUserId: number | null;
  chats: ChatDTO[];
  chatUsers: Record<number, number[]>;
  messages: Record<number, MessageDTO[]>;
  tokens: Record<string, { chatId: number; userId: number }>;
  nextIds: {
    user: number;
    chat: number;
    message: number;
  };
};

export type MockXHRLike = {
  response: unknown;
  status: number;
};
