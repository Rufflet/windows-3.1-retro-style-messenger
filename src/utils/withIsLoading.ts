import { BlockClass } from "core";

type WithIsLoading = {
  isLoading: boolean;
};

/**
 * This HOC does not subscribe to the store, so it only stays in sync
 * when wrapped with withStore.
 */
export function withIsLoading<P extends WithIsLoading>(
  WrappedBlock: BlockClass<P>
) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, isLoading: () => window.store.getState().isLoading });
    }
  } as BlockClass<Omit<P, "isLoading">>;
}
