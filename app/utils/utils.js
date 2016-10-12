function debounce(fn, delay) {
  let timer = null;
  return () => {
    const context = this;
    const args = arguments; // eslint-disable-line
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export default {
  debounce,
};
