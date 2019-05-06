export const weakMemoizeArray = fn => {
  let cache = new WeakMap();
  return arg => {
    if (cache.has(arg)) {
      const old = cache.get(arg);
      if (old.length === arg.length) {
        return old.value;
      }
    }
    const ret = fn(arg);
    cache.set(arg, {
      value: ret,
      length: arg.length
    });
    return ret
  }
}

export const weakMemoizeObj = fn => {
  let cache = new WeakMap();
  return arg => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const ret = fn(arg);
    cache.set(arg, ret);
    return ret;
  };
};

export const weakMemoizeWalk = fn => {
  let cache = new WeakMap();
  return (a, b, node) => {
    if (typeof node !== 'object') {
      return fn(a, b, node);
    }
    if (cache.has(node)) {
      const old = cache.get(node);
      if (old.a === a && old.b === b) {
        return old.value;
      }
    }
    const ret = fn(a, b, node);
    cache.set(node, {
      value: ret,
      a,
      b,
    });
    return ret;
  };
};
