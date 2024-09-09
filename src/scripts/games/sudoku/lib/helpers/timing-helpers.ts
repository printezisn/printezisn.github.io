export const debounce = (
  startCallback: () => void,
  cancelCallback: () => void,
  startWaitTime = 500,
  cancelWaitTime = 1000,
) => {
  let timerId: NodeJS.Timeout | null = null;
  let started = false;

  const start = () => {
    if (timerId != null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      started = true;
      timerId = null;
      startCallback();
    }, startWaitTime);
  };

  const cancel = () => {
    if (timerId != null) {
      clearTimeout(timerId);
      timerId = null;
    }

    if (started) {
      timerId = setTimeout(() => {
        started = false;
        timerId = null;
        cancelCallback();
      }, cancelWaitTime);
    } else {
      cancelCallback();
    }
  };

  return { start, cancel };
};
