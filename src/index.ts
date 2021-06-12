import { DependencyList, useEffect } from "react";

class Unmounted {
  //
}

class Mounted<T> {
  constructor(readonly item: T) {}
}

export const isUnmounted = (state: any): state is Unmounted =>
  state instanceof Unmounted;

export const isMounted = <T>(state: any): state is Mounted<T> =>
  state instanceof Mounted;

export const unwrap = <T>(mounted: Mounted<T>): T => mounted.item;

export type Callback = (resolve: Resolve) => Promise<void>;

export type Resolve = <T>(
  promise: Promise<T>
) => Promise<Unmounted | Mounted<T>>;

export const useAsyncEffect = (
  callback: Callback,
  dependencyList: DependencyList
): void => {
  useEffect(() => {
    let isMounted = true;

    callback(promise =>
      promise.then(item => (isMounted ? new Mounted(item) : new Unmounted()))
    );

    return () => {
      isMounted = false;
    };
  }, dependencyList);
};
