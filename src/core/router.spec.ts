import { Router } from "./Router";

describe("Router", () => {
  const router = new Router();
  router.start();

  it("should listen onpopstate", () => {
    expect(window.onpopstate).toBeInstanceOf(Function);
  });

  it("should add routes", () => {
    router.use("/", () => null);
    // @ts-expect-error  Property 'routes' is private
    expect(router.routes["/"]).toBeInstanceOf(Function);
  });

  it("should change history", () => {
    router.use("/signin", () => null);
    router.go("/signin");
    expect(window.history.length).toBe(2);
  });

  it("should change location pathname", () => {
    router.use("/signup", () => null);
    router.go("/signup");
    expect(window.location.pathname).toBe("/signup");
  });
});
