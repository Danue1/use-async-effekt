import { DependencyList } from "react";

export type State<T> = Unmounted | Mounted<T>;

declare class Unmounted {
  //
}

declare class Mounted<T> {
  readonly item: T;

  constructor(item: T);
}

export const unmounted: () => Unmounted;

export const mounted: <T>(item: T) => Mounted<T>;

export const isUnmounted: (state: any) => state is Unmounted;

export const isMounted: <T>(state: any) => state is Mounted<T>;

export const unwrap: <T>(mounted: Mounted<T>) => T;

export type Callback = (resolve: Resolve) => Promise<void>;

export type Resolve = <T>(promise: Promise<T>) => Promise<State<T>>;

export const useAsyncEffect: (
  callback: Callback,
  dependencyList: DependencyList
) => void;
