type Pair = [number, number];
export const parseInput = (input: string): Pair[][] => input
  .split('\n')
  .map((pairs) => pairs
    .split(',')
    .map((sections) => sections
      .split('-')
      .map((n) => parseInt(n, 10)))
    .filter((pair): pair is Pair => pair.length === 2));

type BLogic = (a: boolean, b: boolean) => boolean;
const and: BLogic = (a, b) => a && b;
const or: BLogic = (a, b) => a || b;

const between = ([start, end]: Pair, n: number) => n >= start && n <= end;

type BetweenFn = (left: Pair, right: Pair) => boolean;
const betweenPair = (logic: BLogic): BetweenFn => (left, right) => logic(
  between(left, right[0]),
  between(left, right[1]),
);
const eitherDir = (checker: BetweenFn) => ([left, right]: Pair[]) => checker(left, right) || checker(right, left);

export const executePart1 = (input: Pair[][]) => input
  .filter(eitherDir(betweenPair(and)))
  .length;

export const executePart2 = (input: Pair[][]) => input
  .filter(eitherDir(betweenPair(or)))
  .length;
