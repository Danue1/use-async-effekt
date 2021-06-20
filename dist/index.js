import { DependencyList, useEffect, useState } from "react";

class Unmounted {
  //
}

class Mounted {
  constructor(item) {
    this.item = item;
  }
}

const UNMOUNTED = new Unmounted();

export const unmounted = () => UNMOUNTED;

export const mounted = item => new Mounted(item);

export const isUnmounted = state => state instanceof Unmounted;

export const isMounted = state => state instanceof Mounted;

export const unwrap = mounted => mounted.item;

export const useAsyncEffect = (callback, dependencyList) => {
  useEffect(() => {
    let isMounted = true;

    callback(promise =>
      promise.then(item => (isMounted ? mounted(item) : unmounted()))
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
