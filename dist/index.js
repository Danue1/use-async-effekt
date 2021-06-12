import { useEffect } from "react";

class Unmounted {
  //
}

class Mounted {
  constructor(item) {
    this.item = item;
  }
}

export const isUnmounted = state => state instanceof Unmounted;

export const isMounted = state => state instanceof Mounted;

export const unwrap = mounted => mounted.item;

export const useAsyncEffect = (callback, dependencyList) => {
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
