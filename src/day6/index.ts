export const parseInput = (input: string) => input;

const unique = <T>(c: T, i: number, list: T[]) => list.indexOf(c) === i;
const findMarkerPos = (markerLength: number, pos: number = 0) => (signal: string): number => signal
  .slice(0, markerLength)
  .split('')
  .filter(unique)
  .length === markerLength
  ? pos + markerLength
  : findMarkerPos(markerLength, pos + 1)(signal.slice(1));

export const executePart1 = findMarkerPos(4);
export const executePart2 = findMarkerPos(14);
