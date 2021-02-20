export const distinctName = (value: string, span = 4): string => {
  const rnd = Math.random()
    .toString()
    .substring(2, span + 2);
  return `${value}_${rnd}`;
};
