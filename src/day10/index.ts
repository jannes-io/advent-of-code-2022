type Instruction = ['addx', number] | ['noop', null];

export const parseInput = (input: string) => input
  .split('\n')
  .map((ins) => ins.split(' '))
  .map(([ins, v]) => [ins, v !== undefined ? parseInt(v, 10) : null])

const pickM = (picks: number[], list: Record<number, number>) => picks.map((p) => list[p]);
const zipWith = <T>(fn: (a: T, b: T) => T, left: T[], right: T[]) => left.map((a, i) => fn(a, right[i]));
const splitEvery = <T>(n: number, list: T[], accum: T[][] = []): T[][] => list.length === 0
  ? accum
  : splitEvery(n, list.slice(n), [...accum, list.slice(0, n)]);

const debugPoints = [20, 60, 100, 140, 180, 220];

const runCpu = (instructions: Instruction[]) => Object.fromEntries(instructions.reduce((acc, [ins, v]) => {
  const [cycle, x] = acc[acc.length - 1];
  return ins === 'addx'
    ? [...acc, [cycle + 1, x], [cycle + 2, x + v]]
    : [...acc, [cycle + 1, x]];
}, [[1, 1]]));

export const executePart1 = (input: Instruction[]) => zipWith(
  (a, b) => a * b,
  debugPoints,
  pickM(debugPoints, runCpu(input)))
  .reduce((a, b) => a + b);

// not my proudest moment
export const executePart2 = (input: Instruction[]) => {
  let cycle = 1;
  let x = 1;
  let crtPos = 0;
  const crt: string[] = [];

  const draw = () => {
    const shouldDraw = [x - 1, x, x + 1].includes(crtPos % 40);
    crt.push(shouldDraw ? '█' : ' ');
    crtPos++;
  }

  input.forEach(([ins, v]) => {
    if (ins === 'addx') {
      draw(x);
      cycle++;
      draw(x);
      cycle++;
      x += v;
    } else {
      draw(x);
      cycle++;
    }
  });

  return splitEvery(40, crt).map((ln) => ln.join('')).join('\n');
};
