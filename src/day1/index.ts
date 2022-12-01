export const parseInput = (input: string) => input
  .split('\n\n')
  .map((inventory) => inventory
    .split('\n')
    .map((cal) => parseInt(cal, 10))
    .reduce((sum, cal) => sum + cal));

export const executePart1 = (input: number[]) => Math.max(...input);

export const executePart2 = (input: number[]) => input
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((sum, cal) => sum + cal);
