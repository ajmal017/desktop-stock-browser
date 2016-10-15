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

const is = (checked, ...elementsToCompareTo) => elementsToCompareTo.indexOf(checked) !== -1;
const objectIsNotEmpty = (object) => Object.keys(object).length !== 0;

export default {
  debounce,
  is,
  objectIsNotEmpty,
};
