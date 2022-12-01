import * as readline from 'readline';
import * as fs from 'fs';

console.log();

const runDay = (day: number) => {
  console.log(`Running day: ${day}`);
  const dayMod = require(`./day${day}`);

  let input = fs.readFileSync(`input/${day}.txt`).toString();
  if (dayMod.parseInput) {
    input = dayMod.parseInput(input);
  }

  console.log(`Part 1: ${dayMod.executePart1(input)}`);
  console.log(`Part 2: ${dayMod.executePart2(input)}`);

  process.exit(0);
};

if (!!process.argv[2]) {
  runDay(parseInt(process.argv[2], 10));
}

const rli = readline.createInterface(process.stdin, process.stdout);
rli.question('Hello master, what day should we execute?  ', (day) => {
  runDay(parseInt(day, 10));
});
