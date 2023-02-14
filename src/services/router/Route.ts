import Block from "../../modules/block";
import { isEqual } from "../../utils/isEqual";
import { render } from "../../utils/render";

export class Route {
  _pathname: string;
  _blockClass: any;
  _block: Block | null;
  _props: {
    rootQuery: string;
  };

  constructor(
    pathname: string,
    view: any,
    props: {
      rootQuery: string;
    }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block!);
      return;
    }

    this._block.show();
  }

  navigate(pathname: string) {
    if (!this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
      this._block = null;
    }
  }
}
