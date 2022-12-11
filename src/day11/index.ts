const toInt = (a: string) => parseInt(a, 10);
const add = (a: number) => (b: number) => a + b;
const addOld = (old: number) => add(old)(old);
const multiply = (a: number) => (b: number) => a * b;
const multiplyOld = (old: number) => multiply(old)(old);

const operation = (fn: string, v: string) => v === 'old'
  ? fn === '+' ? addOld : multiplyOld
  : fn === '+' ? add(toInt(v)) : multiply(toInt(v));

interface Monkey {
  items: number[];
  fn: (n: number) => number;
  d: number;
  t: number;
  f: number;
  i: number;
}

const monkeyExp = /\w+ (\d+):\s.+: (.+)\s.+ ([*+]) (\d+|old)\s.+ (\d+)\s.+ (\d+)\s.+ (\d+)/;
export const parseInput = (input: string) => input
  .split('\n\n')
  .map((monkey) => monkeyExp.exec(monkey))
  .map(([, , items, fn, v, d, t, f]): Monkey => ({
    items: items.split(', ').map(toInt),
    fn: operation(fn, v),
    d: toInt(d),
    t: toInt(t),
    f: toInt(f),
    i: 0,
  }));

const monkeyBusiness = (rounds: number, worryDiv: number) => (monkeysImmut: Monkey[]) => {
  const monkeys = monkeysImmut.map((monkey) => ({
    ...monkey,
    items: [...monkey.items],
  }));

  const multiple = monkeys.reduce((m, { d }) => m * d, 1);

  for (let round = 1; round <= rounds; round++) {
    monkeys.forEach(({ fn, d, t, f }, i, all) => {
      const self = all[i];
      while (self.items.length) {
        const item = all[i].items.shift();
        const worry = Math.floor(fn(item) / worryDiv) % multiple;

        all[worry % d === 0 ? t : f].items.push(worry);
        self.i++;
      }
    });
  }

  return monkeys
    .map(({ i }) => i)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);
}

export const executePart1 = monkeyBusiness(20, 3);
export const executePart2 = monkeyBusiness(10000, 1);
