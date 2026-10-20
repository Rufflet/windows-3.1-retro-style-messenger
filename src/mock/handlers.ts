/* eslint-disable no-param-reassign */
import type {
  SignInRequestData,
  SignUpRequestData,
  UserDTO,
} from "api/types/auth";
import type {
  AddUsersToChatRequest,
  CreateChatRequest,
  DeleteChatRequest,
  DeleteUsersFromChatRequest,
  MessageDTO,
} from "api/types/chats";
import type {
  ChangeUserDataRequest,
  ChangeUserPasswordRequest,
  SearchUserRequest,
} from "api/types/user";
import {
  allocateId,
  appendMessage,
  getChatOrThrow,
  getMessages,
  getSessionUser,
  loadDatabase,
  MockAPIError,
  requireSession,
  saveDatabase,
  toPublicUser,
  upsertChatLastMessage,
} from "./db";
import type { MockDatabase, MockXHRLike, StoredUser } from "./types";

function asMockError(error: unknown): MockAPIError | null {
  return error instanceof MockAPIError ? error : null;
}

function ok(response: unknown, status = 200): MockXHRLike {
  return { response, status };
}

function fail(reason: string, status = 400): MockXHRLike {
  return { response: { reason }, status };
}

function readBody<T>(data: unknown): T {
  return data as T;
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function handleAuth(
  method: string,
  path: string,
  data: unknown,
  db: MockDatabase
): MockXHRLike {
  if (method === "POST" && path === "/signin") {
    const body = readBody<SignInRequestData>(data);
    const user = db.users.find(
      (item) => item.login === body.login && item.password === body.password
    );
    if (!user) {
      return fail("Login or password is incorrect");
    }
    db.sessionUserId = user.id;
    saveDatabase(db);
    return ok("OK");
  }

  if (method === "POST" && path === "/signup") {
    const body = readBody<SignUpRequestData>(data);
    if (db.users.some((item) => item.login === body.login)) {
      return fail("Login already exists");
    }
    if (db.users.some((item) => item.email === body.email)) {
      return fail("Email already exists");
    }

    const user: StoredUser = {
      id: allocateId(db, "user"),
      login: body.login,
      first_name: body.first_name,
      second_name: body.second_name,
      display_name: body.login,
      avatar: "",
      phone: body.phone,
      email: body.email,
      password: body.password,
    };
    db.users.push(user);
    db.sessionUserId = user.id;
    saveDatabase(db);
    return ok({ id: user.id });
  }

  if (method === "GET" && path === "/user") {
    const user = getSessionUser(db);
    if (!user) {
      return fail("Cookie is not valid", 401);
    }
    return ok(toPublicUser(user));
  }

  if (method === "POST" && path === "/logout") {
    db.sessionUserId = null;
    saveDatabase(db);
    return ok("OK");
  }

  return fail("Not found", 404);
}

function handleChats(
  method: string,
  path: string,
  data: unknown,
  db: MockDatabase
): MockXHRLike {
  try {
    requireSession(db);
  } catch (error) {
    const mockError = asMockError(error);
    if (mockError) {
      return fail(mockError.reason, 401);
    }
    throw error;
  }

  if (method === "GET" && path === "") {
    const user = requireSession(db);
    const chats = db.chats.filter((chat) =>
      (db.chatUsers[chat.id] ?? []).includes(user.id)
    );
    return ok(chats);
  }

  if (method === "POST" && path === "") {
    const user = requireSession(db);
    const body = readBody<CreateChatRequest>(data);
    const chatId = allocateId(db, "chat");
    db.chats.push({
      id: chatId,
      title: body.title,
      avatar: null,
      created_by: user.id,
      unread_count: 0,
      last_message: null,
    });
    db.chatUsers[chatId] = [user.id];
    db.messages[chatId] = [];
    saveDatabase(db);
    return ok({ id: chatId });
  }

  if (method === "DELETE" && path === "") {
    const user = requireSession(db);
    const body = readBody<DeleteChatRequest>(data);
    const chat = getChatOrThrow(db, body.chatId);
    if (!(db.chatUsers[chat.id] ?? []).includes(user.id)) {
      return fail("Chat not found");
    }
    db.chats = db.chats.filter((item) => item.id !== body.chatId);
    delete db.chatUsers[body.chatId];
    delete db.messages[body.chatId];
    saveDatabase(db);
    return ok("OK");
  }

  const usersMatch = path.match(/^\/(\d+)\/users$/);
  if (method === "GET" && usersMatch) {
    const chatId = Number(usersMatch[1]);
    getChatOrThrow(db, chatId);
    const userIds = db.chatUsers[chatId] ?? [];
    const users = db.users
      .filter((user) => userIds.includes(user.id))
      .map(toPublicUser);
    return ok(users);
  }

  if (method === "PUT" && path === "/users") {
    const body = readBody<AddUsersToChatRequest>(data);
    getChatOrThrow(db, body.chatId);
    const current = new Set(db.chatUsers[body.chatId] ?? []);
    body.users.forEach((id) => current.add(id));
    db.chatUsers[body.chatId] = Array.from(current);
    saveDatabase(db);
    return ok("OK");
  }

  if (method === "DELETE" && path === "/users") {
    const body = readBody<DeleteUsersFromChatRequest>(data);
    getChatOrThrow(db, body.chatId);
    const remove = new Set(body.users);
    db.chatUsers[body.chatId] = (db.chatUsers[body.chatId] ?? []).filter(
      (id) => !remove.has(id)
    );
    saveDatabase(db);
    return ok("OK");
  }

  const tokenMatch = path.match(/^\/token\/(.+)$/);
  if (method === "POST" && tokenMatch) {
    const user = requireSession(db);
    const chatId = Number(tokenMatch[1]);
    getChatOrThrow(db, chatId);
    if (!(db.chatUsers[chatId] ?? []).includes(user.id)) {
      return fail("Chat not found");
    }
    const token = `tok_${chatId}_${user.id}_${Date.now()}`;
    db.tokens[token] = { chatId, userId: user.id };
    saveDatabase(db);
    return ok({ token });
  }

  return fail("Not found", 404);
}

async function handleUser(
  method: string,
  path: string,
  data: unknown,
  db: MockDatabase,
  isFile: boolean
): Promise<MockXHRLike> {
  try {
    requireSession(db);
  } catch (error) {
    const mockError = asMockError(error);
    if (mockError) {
      return fail(mockError.reason, 401);
    }
    throw error;
  }

  if (method === "PUT" && path === "/profile") {
    const user = requireSession(db);
    const body = readBody<ChangeUserDataRequest>(data);

    if (
      db.users.some((item) => item.login === body.login && item.id !== user.id)
    ) {
      return fail("Login already exists");
    }

    Object.assign(user, body);
    saveDatabase(db);
    return ok(toPublicUser(user));
  }

  if (method === "PUT" && path === "/profile/avatar") {
    const user = requireSession(db);
    if (!isFile || !(data instanceof FormData)) {
      return fail("Avatar is required");
    }
    const file = data.get("avatar");
    if (!(file instanceof File)) {
      return fail("Avatar is required");
    }
    user.avatar = await fileToDataUrl(file);
    saveDatabase(db);
    return ok(toPublicUser(user));
  }

  if (method === "PUT" && path === "/password") {
    const user = requireSession(db);
    const body = readBody<ChangeUserPasswordRequest>(data);
    if (user.password !== body.oldPassword) {
      return fail("Password is incorrect");
    }
    user.password = body.newPassword;
    saveDatabase(db);
    return ok("OK");
  }

  if (method === "POST" && path === "/search") {
    const body = readBody<SearchUserRequest>(data);
    const query = body.login.trim().toLowerCase();
    const results = db.users
      .filter((user) => user.login.toLowerCase().includes(query))
      .map(toPublicUser);
    return ok(results);
  }

  return fail("Not found", 404);
}

export async function dispatchMockRequest(options: {
  baseURL: string;
  url: string;
  method: string;
  data?: unknown;
  isFile?: boolean;
}): Promise<MockXHRLike> {
  try {
    const db = loadDatabase();
    const path = options.url;
    const method = options.method.toUpperCase();

    if (options.baseURL.endsWith("/auth")) {
      return handleAuth(method, path, options.data, db);
    }

    if (options.baseURL.endsWith("/chats")) {
      return handleChats(method, path, options.data, db);
    }

    if (options.baseURL.endsWith("/user")) {
      return handleUser(
        method,
        path,
        options.data,
        db,
        Boolean(options.isFile)
      );
    }

    return fail("Not found", 404);
  } catch (error) {
    const mockError = asMockError(error);
    if (mockError) {
      return fail(mockError.reason);
    }
    throw error;
  }
}

export function createStoredMessage(params: {
  chatId: number;
  userId: number;
  content: string;
}): MessageDTO {
  const db = loadDatabase();
  const message: MessageDTO = {
    id: allocateId(db, "message"),
    user_id: params.userId,
    chat_id: params.chatId,
    type: "message",
    time: new Date().toISOString(),
    content: params.content,
    is_read: true,
    file: null,
  };
  appendMessage(db, message);

  const author = db.users.find((user) => user.id === params.userId);
  if (author) {
    upsertChatLastMessage(db, params.chatId, message, toPublicUser(author));
  }

  saveDatabase(db);
  return message;
}

export function listChatMessages(chatId: number): MessageDTO[] {
  const db = loadDatabase();
  return [...getMessages(db, chatId)].sort((a, b) =>
    a.time > b.time ? 1 : -1
  );
}

export function findBotInChat(
  chatId: number,
  currentUserId: number
): UserDTO | null {
  const db = loadDatabase();
  const memberIds = db.chatUsers[chatId] ?? [];
  const bot = db.users.find(
    (user) => memberIds.includes(user.id) && user.id !== currentUserId
  );
  return bot ? toPublicUser(bot) : null;
}

export function isValidToken(
  token: string,
  chatId: number,
  userId: number
): boolean {
  const db = loadDatabase();
  const entry = db.tokens[token];
  return Boolean(entry && entry.chatId === chatId && entry.userId === userId);
}
