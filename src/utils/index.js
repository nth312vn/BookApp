export const debounce = (callback, ms) => {
  let timmer;

  return function () {
    const args = arguments;
    const context = this;
    clearTimeout(timmer);

    timmer = setTimeout(() => {
      callback.apply(context, args);
    }, ms);
  };
};
