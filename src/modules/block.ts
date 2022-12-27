import EventBus from "./EventBus";

type T = (context: any) => string;

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;
  private _meta: { template: T; props: any };
  eventBus: () => EventBus;
  public errors: string | undefined = '';
  protected props: any;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */

  constructor(template: T, props: any = {}) {
    const eventBus = new EventBus();
    this._meta = {
      template,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  protected dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return oldProps !== newProps;
  }

  protected setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.element) {
      this._removeEvents();
      this._element!.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return this.compile(this._meta.template, this.props);
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _addEvents() {
    const events: Record<string, Record<string, () => void>> = this.props
      .events;

    if (!events || !this.element) {
      return;
    }

    Object.keys(events).forEach((selector) => {
      let elements: HTMLElement[] = [];
      if (selector === "root") {
        elements.push(this.element!);
      } else {
        elements = Array.from(this.element!.querySelectorAll(selector));
      }

      if (!elements) {
        return;
      }

      Object.entries(events[selector]).forEach(([eventName, listener]) => {
        elements.forEach((element) =>
          element.addEventListener(eventName, listener)
        );
      });
    });
  }

  private _removeEvents() {
    const events: Record<string, Record<string, () => void>> = this.props
      .events;

    if (!events || !this.element) {
      return;
    }

    Object.keys(events).forEach((selector) => {
      let elements: HTMLElement[] = [];
      if (selector === "root") {
        elements.push(this.element!);
      } else {
        elements = Array.from(this.element!.querySelectorAll(selector));
      }

      if (!elements) {
        return;
      }

      Object.entries(events[selector]).forEach(([eventName, listener]) => {
        elements.forEach((element) =>
          element.removeEventListener(eventName, listener)
        );
      });
    });
  }

  protected compile(template: any, context: any): DocumentFragment {
    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = template(context);

    return fragment.content;
  }

  public show(): void {
    this.getContent()!.style.display = "block";
  }

  public hide(): void {
    this.getContent()!.style.display = "none";
  }
}
