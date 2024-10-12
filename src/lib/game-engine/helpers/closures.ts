export const debounce = (callback: () => void, timeMs = 500) => {
  let timerId: NodeJS.Timeout | null = null;

  return () => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = null;
      callback();
    }, timeMs);
  };
};
