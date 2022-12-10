const a = 'a'.charCodeAt(0) - 1;
const A = 'A'.charCodeAt(0) - 27;
const toPriority = (n: number) => n >= a ? n - a : n - A;
const toPriorityList = (compartment: string) => compartment
  .split('')
  .map((char: string) => char.charCodeAt(0))
  .map(toPriority);

export const parseInput = (input: string) => input
  .split('\n')
  .map(toPriorityList);

export const executePart1 = (input: number[][]) => input
  .map((sack) => {
    const mid = sack.length / 2;
    return [sack.slice(0, mid), sack.slice(mid)]
  })
  .map(([left, right]) => left.find((ln) => right.find((rn) => ln === rn)))
  .reduce((sum, n) => sum + n);

const splitEvery = <T>(n: number, list: T[], accum: T[][] = []): T[][] => list.length === 0
  ? accum
  : splitEvery(n, list.slice(n), [...accum, list.slice(0, n)]);

export const executePart2 = (input: number[][]) => splitEvery(3, input)
  .map(([left, middle, right]) => left.find((ln) => middle.find((mn) => ln === mn && right.find((rn) => mn === rn))))
  .reduce((sum, n) => sum + n);
