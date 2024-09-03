export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];

  for (let i = result.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = result[randomIndex];
    result[randomIndex] = result[i];
    result[i] = temp;
  }

  return result;
};
