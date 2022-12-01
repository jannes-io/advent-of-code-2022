const add = (sum: number, n: number) => sum + n;

export const parseInput = (input: string) => input
  .split('\r\n\r\n')
  .map((inv) => inv
    .split('\r\n')
    .map((cal: string) => parseInt(cal, 10))
    .reduce(add));

export const executePart1 = (input: number[]) => Math.max(...input);

export const executePart2 = (input: number[]) => input
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(add);
