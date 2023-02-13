import EventBus from "../../modules/eventBus";

export class Store extends EventBus {
  constructor(initionalState: any) {
    super();

    this._state = { ...initionalState };
  }

  private _state = {};

  get state(): any {
    return this._state;
  }

  dispatch(newState: any): void {
    const prevState = this._state;
    this._state = { ...this._state, ...newState };

    this.emit("changed", prevState, this._state);
  }
}
