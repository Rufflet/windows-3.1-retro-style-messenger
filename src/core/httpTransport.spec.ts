import HTTPTransport from "./HTTPTransport";

describe("HTTPTransport", () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const API_URL = process.env.API_ENDPOINT!;
  const mockData = { test: 1 };
  const createXHRMock = () => ({
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    onload: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    response: mockData,
    status: 200,
    withCredentials: false,
  });

  let xhrMock = createXHRMock();
  let http = new HTTPTransport(API_URL);

  beforeEach(() => {
    xhrMock = createXHRMock();

    // @ts-expect-error type mock
    window.XMLHttpRequest = jest.fn(() => xhrMock);

    http = new HTTPTransport(API_URL);
  });

  describe("request", () => {
    it("should create request correctly", () => {
      http.get("/test");

      expect(xhrMock.send).toHaveBeenCalled();
      expect(xhrMock.open).toHaveBeenCalledWith("GET", `${API_URL}/test`, true);
      expect(xhrMock.withCredentials).toBe(true);
    });

    it("should return correct response", () => {
      http.get("/test").then(({ response }) => {
        expect(response).toEqual(mockData);
      });
      xhrMock.onload();
    });
  });

  describe("get", () => {
    it("should create request correctly", () => {
      http.get("/test");

      expect(xhrMock.open).toHaveBeenCalledWith("GET", `${API_URL}/test`, true);
    });

    it("should stringify url", () => {
      http.get("/test", { data: { param: 1 } });

      expect(xhrMock.open).toHaveBeenCalledWith(
        "GET",
        `${API_URL}/test?param=1`,
        true
      );
    });
  });

  describe("post", () => {
    it("should create request correctly", () => {
      http.post("/test");

      expect(xhrMock.open).toHaveBeenCalledWith(
        "POST",
        `${API_URL}/test`,
        true
      );
    });

    it("should send expected data", () => {
      http.post("/test", { data: mockData });

      expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(mockData));
    });
  });

  describe("put", () => {
    it("should create request correctly", () => {
      http.put("/test");

      expect(xhrMock.open).toHaveBeenCalledWith("PUT", `${API_URL}/test`, true);
    });
  });

  describe("delete", () => {
    it("should create request correctly", () => {
      http.delete("/test");

      expect(xhrMock.open).toHaveBeenCalledWith(
        "DELETE",
        `${API_URL}/test`,
        true
      );
    });
  });
});
