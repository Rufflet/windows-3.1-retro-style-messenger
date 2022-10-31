import { queryString } from "utils/helpers";

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
  options: OptionsWithoutMethod
) => Promise<XMLHttpRequest>;

export default class HTTPTransport {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: Method.GET },
      options.timeout
    );
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: Method.PUT },
      options.timeout
    );
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: Method.POST },
      options.timeout
    );
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: Method.DELETE },
      options.timeout
    );
  };

  async request(
    url: string,
    options: Options = { method: Method.GET },
    timeout = 5000
  ): Promise<XMLHttpRequest> {
    let targetUrl = `${this.baseURL}${url}`;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data, isFile = false } = options;

      if (data && method === Method.GET) {
        targetUrl += `?${queryString(data)}`;
      }

      xhr.open(method, targetUrl, true);
      if (!isFile) {
        xhr.setRequestHeader("content-type", "application/json");
      }
      xhr.setRequestHeader("accept", "application/json");
      xhr.responseType = "json";

      xhr.withCredentials = true;
      xhr.timeout = timeout;
      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(isFile ? (data as FormData) : JSON.stringify(data));
      }
    });
  }
}
