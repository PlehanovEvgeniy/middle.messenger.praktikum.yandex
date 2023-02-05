export class Store {
  constructor(initionalState: any) {
    this._state = { ...initionalState };
  }

  private _state = {};

  get state(): any {
    return this._state;
  }

  dispatch(newState: any): void {
    this._state = { ...this._state, ...newState };
  }
}
