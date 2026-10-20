import { dispatchMockRequest } from "./handlers";
import type { MockXHRLike } from "./types";

enum Method {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

type Options = {
  method: Method;
  data?: unknown;
  timeout?: number;
  isFile?: boolean;
};

type OptionsWithoutMethod = Omit<Options, "method">;

type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod
) => Promise<MockXHRLike>;

/**
 * Drop-in replacement for HTTPTransport that serves the in-browser mock API.
 * Preserves the `{ response }` shape used by api/* modules.
 */
export default class MockTransport {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: Method.GET });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: Method.PUT });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: Method.POST });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: Method.DELETE });
  };

  async request(
    url: string,
    options: Options = { method: Method.GET }
  ): Promise<MockXHRLike> {
    // Tiny delay so UI loading states behave like a real network hop
    await new Promise((resolve) => {
      setTimeout(resolve, 20);
    });

    return dispatchMockRequest({
      baseURL: this.baseURL,
      url,
      method: options.method,
      data: options.data,
      isFile: options.isFile,
    });
  }
}
