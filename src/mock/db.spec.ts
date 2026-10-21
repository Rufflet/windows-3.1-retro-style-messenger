import { resetDatabase, loadDatabase, getSessionUser } from "./db";
import { dispatchMockRequest } from "./handlers";
import { DEMO_LOGIN } from "./seed";

describe("mock database / auth", () => {
  beforeEach(() => {
    resetDatabase();
  });

  it("seeds demo chats for the demo user", async () => {
    const signIn = await dispatchMockRequest({
      baseURL: "/api/auth",
      url: "/signin",
      method: "POST",
      data: DEMO_LOGIN,
    });
    expect(signIn.response).toBe("OK");

    const chats = await dispatchMockRequest({
      baseURL: "/api/chats",
      url: "",
      method: "GET",
    });
    expect(Array.isArray(chats.response)).toBe(true);
    expect((chats.response as unknown[]).length).toBeGreaterThan(0);
  });

  it("rejects invalid credentials", async () => {
    const result = await dispatchMockRequest({
      baseURL: "/api/auth",
      url: "/signin",
      method: "POST",
      data: { login: "demo", password: "wrong" },
    });
    expect(result.response).toEqual({
      reason: "Login or password is incorrect",
    });
  });

  it("persists session user after sign-in", async () => {
    await dispatchMockRequest({
      baseURL: "/api/auth",
      url: "/signin",
      method: "POST",
      data: DEMO_LOGIN,
    });
    const db = loadDatabase();
    expect(getSessionUser(db)?.login).toBe("demo");
  });

  it("creates a message via chat token flow", async () => {
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
    expect((tokenResult.response as { token: string }).token).toBeTruthy();
  });
});
