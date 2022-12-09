type Vec2<T> = [T, T];
type N2 = Vec2<number>;
type VecToVel = Record<string, N2>
const vecToVel: VecToVel = {
  R: [1, 0],
  RU: [1, 1],
  U: [0, 1],
  UL: [-1, 1],
  L: [-1, 0],
  LD: [-1, -1],
  D: [0, -1],
  DR: [1, -1],
};

export const parseInput = (input: string) => input
  .split('\n')
  .map((line) => line
    .split(' '))
  .reduce((unlooped: N2[], [dir, mag]) => [
    ...unlooped,
    ...Array(parseInt(mag, 10)).fill(vecToVel[dir])
  ], []);

type N2Fn<T> = (v1: N2, v2: N2) => T;

const add: N2Fn<N2> = ([posX, posY], [velX, velY]) => [posX + velX, posY + velY];
const subtract: N2Fn<N2> = ([posX, posY], [velX, velY]) => [posX - velX, posY - velY];
const equal: N2Fn<boolean> = ([pos1X, pos1Y], [pos2X, pos2Y]) => pos1X === pos2X && pos1Y === pos2Y;
const adjacent = (pos: N2) => Object.values(vecToVel).some((vel) => equal(vel, pos));
const clamp = (min: number, max: number) => (n: number) => n > max ? max : (n < min ? min : n);
const clampN2 = (min: number, max: number, vec: N2) => vec.map(clamp(min, max));

interface TrailTailAccum {
  head: N2;
  tail: N2;
  tailVisited: N2[];
}

const trailTail = ({ head, tail, tailVisited }: TrailTailAccum, vel: N2) => {
  const newHead = add(head, vel);
  const offset = subtract(newHead, tail);
  if (adjacent(offset)) {
    return { head: newHead, tail, tailVisited };
  }
  const newTail = add(tail, clampN2(-1, 1, offset));
  const notVisited = tailVisited.find((visited) => equal(visited, newTail)) === undefined;
  return {
    head: newHead,
    tail: newTail,
    tailVisited: notVisited ? [...tailVisited, newTail] : tailVisited,
  };
};

export const executePart1 = (input: N2[]) => input
  .reduce(trailTail, { head: [0, 0], tail: [0, 0], tailVisited: [[0, 0]] })
  .tailVisited
  .length;

export const executePart2 = (input: unknown) => {
};
