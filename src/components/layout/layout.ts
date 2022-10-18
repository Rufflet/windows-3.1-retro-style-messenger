import Block from "../../core/Block";
import "./layout.css";

interface LayoutProps {
  class?: string;
}

export class Layout extends Block<LayoutProps> {
  static componentName = "Layout";

  protected render(): string {
    return `
      <main class="{{class}}">
        <div class="layout" data-slot=1></div>
      </main>
    `;
  }
}
