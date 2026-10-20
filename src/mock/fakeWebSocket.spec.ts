import { resetDatabase } from "./db";
import { dispatchMockRequest } from "./handlers";
import { FakeWebSocket } from "./fakeWebSocket";
import { DEMO_LOGIN } from "./seed";

describe("FakeWebSocket", () => {
  beforeEach(() => {
    resetDatabase();
  });

  it("loads history and echoes a message with a bot reply", async () => {
    await dispatchMockRequest({
      baseURL: "/api/auth",
      url: "/signin",
      method: "POST",
      data: DEMO_LOGIN,
    });

    const tokenResult = await dispatchMockRequest({
      baseURL: "/api/chats",
      url: "/token/101",
      method: "POST",
    });
    const { token } = tokenResult.response as { token: string };

    const socket = new FakeWebSocket(`/ws/chats/1/101/${token}`);
    const messages: unknown[] = [];

    await new Promise<void>((resolve) => {
      socket.addEventListener("open", () => resolve());
    });

    socket.addEventListener("message", (event) => {
      messages.push(JSON.parse((event as MessageEvent).data));
    });

    socket.send(JSON.stringify({ type: "get old", content: "0" }));
    expect(Array.isArray(messages[0])).toBe(true);

    socket.send(
      JSON.stringify({ type: "message", content: "hello from test" })
    );
    expect((messages[1] as { content: string }).content).toBe(
      "hello from test"
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1600);
    });

    expect(messages.length).toBeGreaterThanOrEqual(3);
    expect((messages[2] as { type: string }).type).toBe("message");
    expect((messages[2] as { user_id: number }).user_id).not.toBe(1);
  }, 10000);
});
