import { Router } from "./Router";
import { Route } from "./Route";
import {expect} from "chai";

describe("Router", () => {
  let router: Router;
  const rootQuery = "#root";

  beforeEach(() => {
    router = new Router(rootQuery);
  });

  it("should have a history property", () => {
    expect(router.history).to.exist;
  });

  it("should have an empty routes array", () => {
    expect(router.routes).to.be.an("array").that.is.empty;
  });

  it("should have a null currentRoute property", () => {
    expect(router._currentRoute).to.be.null;
  });

  it("should have a rootQuery property", () => {
    expect(router._rootQuery).to.equal(rootQuery);
  });

  describe("use method", () => {
    it("should add a new route", () => {
      const pathname = "/test";
      const block = () => {
      };
      router.use(pathname, block);
      expect(router.routes).to.have.lengthOf(1);
      expect(router.routes[0]).to.be.an.instanceOf(Route);
    });
  });
})
