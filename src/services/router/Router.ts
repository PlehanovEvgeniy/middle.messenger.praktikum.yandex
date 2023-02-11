import { Route } from "./Route";

export class Router {
  history: History;
  routes: Route[];
  _currentRoute: Route | null;
  _rootQuery: string;

  private static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event) => {
      event.currentTarget &&
        // @ts-ignore
        this.go(event.currentTarget.location.pathname);
    };

    this.go(window.location.pathname);
  }

  go(pathname: string) {
    if (window.store.state.currentUser && pathname === "/") {
      pathname = "/messenger";
    }
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
