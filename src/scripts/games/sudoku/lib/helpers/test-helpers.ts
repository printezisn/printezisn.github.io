const waitForInner = (
  callback: () => void,
  resolve: () => void,
  reject: (value: Error) => void,
  times: number,
  waitTime: number,
) => {
  try {
    callback();
    resolve();
  } catch (e) {
    if (times === 0) {
      reject(e as Error);
      return;
    }

    setTimeout(() => {
      waitForInner(callback, resolve, reject, times - 1, waitTime);
    }, waitTime);
  }
};

export const waitFor = (callback: () => void) => {
  return new Promise((resolve, reject) => {
    waitForInner(callback, resolve as () => void, reject, 5, 100);
  });
};
