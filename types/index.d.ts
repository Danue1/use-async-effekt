import { DependencyList } from "react";

declare class Unmounted {
  //
}

declare class Mounted<T> {
  readonly item: T;

  constructor(item: T);
}

export const isUnmounted: (state: any) => state is Unmounted;

export const isMounted: <T>(state: any) => state is Mounted<T>;

export const unwrap: <T>(mounted: Mounted<T>) => T;

export type Callback = (resolve: Resolve) => Promise<void>;

export type Resolve = <T>(
  promise: Promise<T>
) => Promise<Unmounted | Mounted<T>>;

export const useAsyncEffect: (
  callback: Callback,
  dependencyList: DependencyList
) => void;
