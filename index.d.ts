declare module "*.png";
declare module "*.svg";
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
