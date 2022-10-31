import { nanoid } from "nanoid";
import Handlebars from "handlebars";
import EventBus from "./EventBus";

type Events = Values<typeof Block.EVENTS>;

export interface BlockClass<P extends Record<string, any>> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
}

export default class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: "flow:component-will-unmount",
    FLOW_RENDER: "flow:render",
  } as const;

  static componentName: string;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;

  protected readonly props: P;

  protected children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};

  refs: { [key: string]: Block } = {};

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this.getStateFromProps(props);

    this.props = this._makePropsProxy(props || ({} as P));
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._element = this._createDocumentElement("div");
  }

  protected getStateFromProps(_props: any): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(_props: P) {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.children = {};
    this._render();
  }

  protected componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  private _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentWillUnmount() {}

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return "";
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  private _makePropsProxy(props: P): P {
    return new Proxy(props as unknown as object, {
      get: (target: Record<string, unknown>, prop: string) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldTarget = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    }) as unknown as P;
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _removeEvents() {
    const { events }: { events: Record<string, () => void> } = this
      .props as any;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const { events }: { events: Record<string, () => void> } = this
      .props as any;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement("template");

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const slotContent = content.querySelector(
        '[data-slot="1"]'
      ) as HTMLElement;

      if (slotContent && stubChilds.length) {
        slotContent.append(...stubChilds);
        delete slotContent.dataset.slot;
      }
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
