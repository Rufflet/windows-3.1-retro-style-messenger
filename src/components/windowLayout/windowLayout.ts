import { Block } from "core";
import { Views } from "../../utils";

import "./windowLayout.css";

interface WindowLayoutPropsWithEvents extends WindowLayoutProps {
  events: {
    click: (e: Event) => void;
  };
}

interface WindowLayoutProps {
  title?: string;
  passive?: boolean;
}

export class WindowLayout extends Block<WindowLayoutPropsWithEvents> {
  static componentName = "WindowLayout";

  constructor(props: WindowLayoutProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          const window = this.getContent();
          const min = window.querySelector("div.button.minimize");
          const max = window.querySelector("div.button.maximize");
          const close = window.querySelector("div.button.close");

          if (e.target === min) {
            this.handleMinimize(window);
          } else if (e.target === max) {
            this.handleMaximize(window);
          } else if (e.target === close) {
            this.handleClose();
          }
        },
      },
    });
  }

  handleMinimize(window: HTMLElement) {
    if (window.classList.contains("maximized"))
      window.classList.remove("maximized");
    window.classList.toggle("minimized");
  }

  handleMaximize(window: HTMLElement) {
    if (window.classList.contains("minimized"))
      window.classList.remove("minimized");
    window.classList.toggle("maximized");
  }

  handleClose() {
    window.router.go(Views.Cover);
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="window">
        <div class="window__container">
          <div class="window__title {{#if passive}}window__title_passive{{/if}}">
            <div class="button close" title="Панель управления">&#8212;</div>
            {{title}}
            <div class="button maximize" title="Развернуть окно">&#9650;</div>
            <div class="button minimize" title="Свернуть окно">&#9660;</div>
          </div>
          <div class="window__content" data-slot="1"></div>
        </div>
        <div class="window__handle window__handle_bottomright"></div>
        <div class="window__handle window__handle_topright"></div>
        <div class="window__handle window__handle_topleft"></div>
        <div class="window__handle window__handle_bottomleft"></div>
      </div>
    `;
  }
}
