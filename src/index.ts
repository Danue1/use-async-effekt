import { DependencyList, useEffect, useState } from "react";

export type State<T> = Unmounted | Mounted<T>;

class Unmounted {
  //
}

class Mounted<T> {
  constructor(readonly item: T) {}
}

const UNMOUNTED = new Unmounted();

export const unmounted = () => UNMOUNTED;

export const mounted = <T>(item: T): Mounted<T> => new Mounted(item);

export const isUnmounted = (state: any): state is Unmounted =>
  state instanceof Unmounted;

export const isMounted = <T>(state: any): state is Mounted<T> =>
  state instanceof Mounted;

export const unwrap = <T>(mounted: Mounted<T>): T => mounted.item;

export type Callback = (resolve: Resolve) => Promise<void>;

export type Resolve = <T>(promise: Promise<T>) => Promise<State<T>>;

export const useAsyncEffect = (
  callback: Callback,
  dependencyList: DependencyList
): void => {
  useEffect(() => {
    let isMounted = true;

    callback(promise =>
      promise.then(item => (isMounted ? mounted(item) : unmounted))
    ).catch(error => {
      if (isMounted) {
        throw error;
      }
    });

    return () => {
      isMounted = false;
    };
  }, dependencyList);
};
