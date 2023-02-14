export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: Record<string, any>;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
  constructor(private baseUrl: string) {}

  get(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  post(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  delete(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  private queryStringify(data: Record<string, any>) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${
      index < keys.length - 1 ? '&' : ''
    }`, '?');
  }

  request(
    url: string,
    options: Options = { method: METHOD.GET },
  ): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;
    if (
      !headers['content-type']
      && !(data && data instanceof window.FormData)
    ) {
      headers['content-type'] = 'application/json';
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const currentUrl = `${this.baseUrl}${url}`;
      xhr.withCredentials = true;
      xhr.timeout = 500000;
      // xhr.setRequestHeader('access-control-allow-origin', "*")
      xhr.open(
        method,
        method === METHOD.GET && data
          ? `${currentUrl}${this.queryStringify(data)}`
          : currentUrl,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data) as XMLHttpRequestBodyInit);
      }
    });
  }
}

export const ApiInstance = new HTTPTransport(
  'https://ya-praktikum.tech/api/v2/',
);
