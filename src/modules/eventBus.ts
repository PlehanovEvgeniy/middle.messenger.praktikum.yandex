export type Listener<T extends unknown[]> = (...args: T) => void;

export default class EventBus<
  EVENT extends string = string,
  M extends { [K in EVENT]: unknown[] } = Record<EVENT, unknown[]>
> {
  private listeners: { [key in EVENT]?: Listener<M[EVENT]>[] } = {};

  on(event: EVENT, callback: Listener<M[EVENT]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]?.push(callback);
  }

  off(event: EVENT, callback: Listener<M[EVENT]>): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(
      (listener) => listener !== callback
    );
  }

  emit(event: EVENT, ...args: M[EVENT]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]?.forEach(function (listener) {
      listener(...args);
    });
  }
}
