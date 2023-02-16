declare global {
  export interface Window {
    router: Router;
    store: Store;
  }

  export interface globalThis {
    store: Store;
  }
}
export {};
