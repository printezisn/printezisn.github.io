export const timeout = (timeMs: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeMs);
  });
};
