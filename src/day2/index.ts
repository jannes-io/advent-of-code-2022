// A/X = Rock
// B/Y = Paper
// C/Z = Scissors
type Lookup = Record<string, number>;
const elfLookup: Lookup = { A: 0, B: 1, C: 2 };
const selfLookup: Lookup = { X: 0, Y: 1, Z: 2 };

// +1 index vs points offset
const points = {
  win: 7,
  draw: 4,
  lose: 1,
};

export const parseInput = (input: string) => input
  .split('\n')
  .map((ln) => ln.split(' '))
  .map(([elf, self]) => [elfLookup[elf], selfLookup[self]]);

export const executePart1 = (input: [number, number][]) => input
  .map(([elf, self]) => elf === self
    ? self + points.draw
    : (elf + 1) % 3 === self
      ? self + points.win
      : self + points.lose)
  .reduce((sum, result) => sum + result);

export const executePart2 = (input: [number, number][]) => input
  .map(([elf, result]) => result === 1
    ? elf + points.draw
    : result === 2
      ? (elf + 1) % 3 + points.win
      : (elf + 2) % 3 + points.lose)
  .reduce((sum, result) => sum + result);
