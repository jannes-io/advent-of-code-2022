const lt = (a: number) => (b: number) => b < a;

const visibleInRows = (trees: number[][]) => trees
  .map((row) => row
    .map((tree, x) => (
      x === 0 || x + 1 === row.length
      || row.slice(0, x).every(lt(tree))
      || row.slice(x + 1).every(lt(tree))
    )));

const firstTaller = (row: number[], tree: number) => row
  .findIndex((t) => t >= tree) + 1 || row.length;

const scenicScoreInRows = (trees: number[][]) => trees
  .map((row) => row
    .map((tree, x) => x === 0 || x + 1 === row.length
      ? 0
      : firstTaller(row.slice(0, x).reverse(), tree) * firstTaller(row.slice(x + 1), tree)));

const zipWith = <T>(zip: (a: T, b: T) => T, left: T[][], right: T[][]) => left
  .map((row, i) => row.map((item, j) => zip(item, right[i][j])))
  .flat();

const transpose = <T>(list: T[][]) => list[0].map((_, colIdx) => list.map((row) => row[colIdx]));

export const parseInput = (input: string) => input
  .split('\n')
  .map((line) => line
    .split('')
    .map((n) => parseInt(n, 10)));

export const executePart1 = (input: number[][]) => zipWith(
  (a, b) => a || b,
  visibleInRows(input),
  transpose(visibleInRows(transpose(input)))
).filter((b) => b).length;

export const executePart2 = (input: number[][]) => Math.max(...zipWith(
  (a, b) => a * b,
  scenicScoreInRows(input),
  transpose(scenicScoreInRows(transpose(input)))
));
