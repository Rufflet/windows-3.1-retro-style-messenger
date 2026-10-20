import { botReplyDelayMs, pickBotReply } from "./bots";
import {
  createStoredMessage,
  findBotInChat,
  isValidToken,
  listChatMessages,
} from "./handlers";

type Listener = (event: Event) => void;

/**
 * In-browser stand-in for the chat WebSocket protocol:
 * - open → client sends `{ type: "get old", content: "0" }`
 * - server replies with MessageDTO[]
 * - client sends `{ type: "message", content }`
 * - server echoes the message and schedules a bot reply
 */
export class FakeWebSocket {
  static CONNECTING = 0;

  static OPEN = 1;

  static CLOSING = 2;

  static CLOSED = 3;

  readyState = FakeWebSocket.CONNECTING;

  readonly url: string;

  private listeners: Record<string, Listener[]> = {};

  private readonly userId: number;

  private readonly chatId: number;

  private readonly token: string;

  private botTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(url: string) {
    this.url = url;

    const match = url.match(/\/chats\/(\d+)\/(\d+)\/(.+)$/);
    if (!match) {
      this.userId = 0;
      this.chatId = 0;
      this.token = "";
      queueMicrotask(() => {
        this.readyState = FakeWebSocket.CLOSED;
        this.emit("error", new Event("error"));
        this.emit(
          "close",
          new CloseEvent("close", { wasClean: false, code: 1008 })
        );
      });
      return;
    }

    this.userId = Number(match[1]);
    this.chatId = Number(match[2]);
    this.token = decodeURIComponent(match[3]);

    queueMicrotask(() => {
      if (!isValidToken(this.token, this.chatId, this.userId)) {
        this.readyState = FakeWebSocket.CLOSED;
        this.emit("error", new Event("error"));
        this.emit(
          "close",
          new CloseEvent("close", {
            wasClean: false,
            code: 1008,
            reason: "Invalid token",
          })
        );
        return;
      }

      this.readyState = FakeWebSocket.OPEN;
      this.emit("open", new Event("open"));
    });
  }

  addEventListener(type: string, listener: Listener): void {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  removeEventListener(type: string, listener: Listener): void {
    this.listeners[type] = (this.listeners[type] ?? []).filter(
      (item) => item !== listener
    );
  }

  send(raw: string): void {
    if (this.readyState !== FakeWebSocket.OPEN) {
      return;
    }

    let payload: { type?: string; content?: string };
    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }

    if (payload.type === "ping") {
      return;
    }

    if (payload.type === "get old") {
      this.emitMessage(listChatMessages(this.chatId));
      return;
    }

    if (payload.type === "message" && typeof payload.content === "string") {
      const stored = createStoredMessage({
        chatId: this.chatId,
        userId: this.userId,
        content: payload.content,
      });
      this.emitMessage(stored);
      this.scheduleBotReply(payload.content);
    }
  }

  close(code = 1000, reason = ""): void {
    if (this.botTimer) {
      clearTimeout(this.botTimer);
      this.botTimer = null;
    }
    this.readyState = FakeWebSocket.CLOSED;
    this.emit(
      "close",
      new CloseEvent("close", { wasClean: true, code, reason })
    );
  }

  private emit(type: string, event: Event): void {
    (this.listeners[type] ?? []).forEach((listener) => listener(event));
  }

  private emitMessage(data: unknown): void {
    this.emit(
      "message",
      new MessageEvent("message", { data: JSON.stringify(data) })
    );
  }

  private scheduleBotReply(userContent: string): void {
    const bot = findBotInChat(this.chatId, this.userId);
    if (!bot) {
      return;
    }

    if (this.botTimer) {
      clearTimeout(this.botTimer);
    }

    this.botTimer = setTimeout(() => {
      if (this.readyState !== FakeWebSocket.OPEN) {
        return;
      }
      const reply = createStoredMessage({
        chatId: this.chatId,
        userId: bot.id,
        content: pickBotReply(userContent),
      });
      this.emitMessage(reply);
    }, botReplyDelayMs());
  }
}
