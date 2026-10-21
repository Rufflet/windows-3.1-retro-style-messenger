/* eslint-disable no-param-reassign */
import type { UserDTO } from "api/types/auth";
import type { ChatDTO, MessageDTO } from "api/types/chats";
import { createSeedDatabase } from "./seed";
import type { MockDatabase, StoredUser } from "./types";

const STORAGE_KEY = "win31-messenger-db";
const DB_VERSION = 6;

let memoryFallback: MockDatabase | null = null;

function canUseStorage(): boolean {
  try {
    return typeof localStorage !== "undefined";
  } catch {
    return false;
  }
}

export function saveDatabase(db: MockDatabase): void {
  if (canUseStorage()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } else {
    memoryFallback = db;
  }
}

export function loadDatabase(): MockDatabase {
  if (canUseStorage()) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as MockDatabase;
        if (parsed.version === DB_VERSION) {
          return parsed;
        }
      } catch {
        // fall through to seed
      }
    }
  } else if (memoryFallback && memoryFallback.version === DB_VERSION) {
    return memoryFallback;
  }

  const seed = createSeedDatabase();
  saveDatabase(seed);
  return seed;
}

export function resetDatabase(): MockDatabase {
  memoryFallback = null;
  if (canUseStorage()) {
    localStorage.removeItem(STORAGE_KEY);
  }
  return loadDatabase();
}

export function toPublicUser(user: StoredUser): UserDTO {
  return {
    id: user.id,
    login: user.login,
    first_name: user.first_name,
    second_name: user.second_name,
    display_name: user.display_name,
    avatar: user.avatar,
    phone: user.phone,
    email: user.email,
  };
}

export function getSessionUser(db: MockDatabase): StoredUser | null {
  if (db.sessionUserId == null) {
    return null;
  }
  return db.users.find((user) => user.id === db.sessionUserId) ?? null;
}

export class MockAPIError extends Error {
  reason: string;

  constructor(reason: string) {
    super(reason);
    this.reason = reason;
    this.name = "MockAPIError";
  }
}

export function requireSession(db: MockDatabase): StoredUser {
  const user = getSessionUser(db);
  if (!user) {
    throw new MockAPIError("Cookie is not valid");
  }
  return user;
}

export function allocateId(
  db: MockDatabase,
  key: keyof MockDatabase["nextIds"]
): number {
  const id = db.nextIds[key];
  db.nextIds[key] += 1;
  return id;
}

export function upsertChatLastMessage(
  db: MockDatabase,
  chatId: number,
  message: MessageDTO,
  author: UserDTO
): void {
  const chat = db.chats.find((item) => item.id === chatId);
  if (!chat) {
    return;
  }

  chat.last_message = {
    user: {
      login: author.login,
      first_name: author.first_name,
      second_name: author.second_name,
      avatar: author.avatar,
      phone: author.phone,
      email: author.email,
    },
    time: message.time,
    content: message.content,
  };
}

export function getChatOrThrow(db: MockDatabase, chatId: number): ChatDTO {
  const chat = db.chats.find((item) => item.id === chatId);
  if (!chat) {
    throw new MockAPIError("Chat not found");
  }
  return chat;
}

export function getMessages(db: MockDatabase, chatId: number): MessageDTO[] {
  return db.messages[chatId] ?? [];
}

export function appendMessage(
  db: MockDatabase,
  message: MessageDTO
): MessageDTO {
  if (!db.messages[message.chat_id]) {
    db.messages[message.chat_id] = [];
  }
  db.messages[message.chat_id].push(message);
  return message;
}
