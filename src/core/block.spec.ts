// eslint-disable-next-line import/named,max-classes-per-file
import Block from "./Block";

describe("Block Class", () => {
  class Component extends Block {
    render() {
      return "<div></div>";
    }
  }

  describe("init", () => {
    it("should init props", () => {
      const testComponent = new Component({
        title: "dummy",
      });

      // @ts-expect-error Property 'props' is protected
      expect(testComponent.props).toEqual({ title: "dummy" });
    });
  });

  describe("update", () => {
    it("should set props correctly", () => {
      const testComponent = new Component({ foo: "bar" });

      testComponent.setProps({ foo: "baz" });

      // @ts-expect-error Property 'props' is protected
      expect(testComponent.props.foo).toBe("baz");
    });

    it("should emit CDU event on props changed", () => {
      const testComponent = new Component({ test: 1 });
      // @ts-expect-error Testing protected method
      const spy = jest.spyOn(testComponent, "componentDidUpdate");

      testComponent.setProps({ test: 2 });

      expect(spy).toHaveBeenCalled();
    });

    it("should call render on props changed", () => {
      const testComponent = new Component({ test: 1 });
      const spy = jest.spyOn(testComponent, "render");

      testComponent.setProps({ test: 2 });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("render", () => {
    it("should render correct template & content", () => {
      class ComponentBlock extends Block<{ text: string }> {
        render() {
          return "<div>{{text}}</div>";
        }
      }

      const testComponent = new ComponentBlock({ text: "test" });

      expect(testComponent.getContent().tagName).toBe("DIV");
      expect(testComponent.getContent().textContent).toBe("test");
    });
  });
});
