import Block from "../../core/Block";
import "./windowLayout.css";

interface WindowLayoutProps {
  title?: string;
}

export class WindowLayout extends Block<WindowLayoutProps> {
  static componentName = "WindowLayout";

  protected render(): string {
    // language=hbs
    return `
      <div class="window">
        <div class="window__container">
          <div class="window__title">
            <div class="button close" id="window">&#8212;</div>
            {{title}}
            <div class="button" id="max" onclick="maximize(this)">&#9650;</div>
            <div class="button" id="min" onclick="minimize(this)">&#9660;</div>
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
