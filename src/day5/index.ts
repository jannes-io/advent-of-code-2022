interface Instruction {
  qty: number;
  from: number;
  to: number;
}

type Stack = string[][];

interface Crane {
  stack: Stack;
  instructions: Instruction[];
}

const splitEvery = <T>(n: number, skip: number, list: T[], accum: T[][] = []): T[][] => list.length === 0
  ? accum
  : splitEvery(n, skip, list.slice(n + skip), [...accum, list.slice(0, n)])

const transpose = <T>(list: T[][]) => list[0].map((_, colIndex) => list.map(row => row[colIndex]));

export const parseInput = (input: string): Crane => {
  const [dirtyStack, dirtyMoves] = input.split('\n\n');

  const stack = transpose(dirtyStack
    .split('\n')
    .slice(0, -1)
    .map((line) => splitEvery(3, 1, line.split(''))
      .map((c) => c[1]))
    .reverse())
    .map((ln) => ln.filter((c) => c !== ' '));

  const instructionExp = /move (\d+) from (\d+) to (\d+)/;
  const instructions = dirtyMoves
    .split('\n')
    .map((ln) => instructionExp.exec(ln))
    .map(([_, qty, from, to]) => [qty, from, to].map((n) => parseInt(n, 10)))
    .map(([qty, from, to]) => ({ qty, from: from - 1, to: to - 1 }));

  return { stack, instructions };
};

const runInstruction = (stack: Stack, { from, to, qty }: Instruction, grabMultiple: boolean) => {
  const newStack = [...(stack.map((col) => [...col]))];
  const containers = newStack[from].splice(newStack[from].length - qty, qty);
  newStack[to].push(...(grabMultiple ? containers : containers.reverse()));

  return newStack;
};

const runCrane = (grabMultiple: boolean) => ({ stack, instructions }: Crane) => instructions
  .reduce((acc, instruction) => runInstruction(acc, instruction, grabMultiple), stack)
  .map((column) => column[column.length - 1])
  .join('');

export const executePart1 = runCrane(false);
export const executePart2 = runCrane(true);
