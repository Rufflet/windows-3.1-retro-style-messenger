import { BlockClass, Dispatch } from "core";

// type WithStateProps = { store: Store<AppState> };
type WithStateProps = { dispatch: Dispatch<AppState> };

export function withStore<P extends WithStateProps>(
  WrappedBlock: BlockClass<P>,
  mapStateToProps: (state: AppState) => Partial<P>
) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    private props!: P;

    constructor(props: P) {
      super({
        ...props,
        ...mapStateToProps(window.store.getState()),
        dispatch: window.store.dispatch.bind(window.store),
      });
    }

    __onChangeStoreCallback = () => {
      // @ts-expect-error this is not typed
      this.setProps({
        ...this.props,
        ...mapStateToProps(window.store.getState()),
        dispatch: window.store.dispatch.bind(window.store),
      });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on("changed", this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off("changed", this.__onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, "store">>;
}
