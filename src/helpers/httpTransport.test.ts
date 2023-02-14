import {HTTPTransport, METHOD} from "./HTTPTransport";

describe("HTTPTransport", () => {
  let transport: HTTPTransport;

  beforeEach(() => {
    transport = new HTTPTransport("https://jsonplaceholder.typicode.com");
  });

  describe("get", () => {
    it("should make a GET request", (done) => {
      transport.get("/posts").then(() => {
        done();
      });
    });
  });

  describe("post", () => {
    it("should make a POST request", (done) => {
      transport.post("/some-url").then(() => {
        done();
      });
    });
  });

  describe("put", () => {
    it("should make a PUT request", (done) => {
      transport.put("/some-url").then(() => {
        done();
      });
    });
  });

  describe("delete", () => {
    it("should make a DELETE request", (done) => {
      transport.delete("/some-url").then(() => {
        done();
      });
    });
  });

  describe("request", () => {
    it("should add a content-type header if data is not a FormData instance", (done) => {
      transport
        .request("/some-url", { method: METHOD.POST, data: { key: "value" } })
        .then(() => {
          done();
        });
    });
  });
});
