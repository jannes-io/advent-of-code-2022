interface Command {
  command: string;
  args: string;
  stdout: string[][];
}

type Directory = Record<string, number>;

interface DirectoryState {
  workingDir: number[];
  allDirs: number[];
  directory: Directory;
}

const groupCommands = (commands: Command[], line: string[]) => line[0] === '$'
  ? [...commands, { command: line[1], args: line.slice(2), stdout: [] as string[] }]
  : commands[commands.length - 1].stdout.push(line) && commands

const executeCommand = ({ directory, allDirs, workingDir }: DirectoryState, command: Command) => {
  if (command.command === 'cd') {
    const dirId = allDirs.length;

    return command.args[0] === '..'
      ? { directory, workingDir: workingDir.slice(0, -1), allDirs }
      : { directory, workingDir: [...workingDir, dirId], allDirs: [...allDirs, dirId] };
  }

  return {
    directory: {
      ...directory,
      ...command.stdout
        .filter(([v]) => v !== 'dir')
        .map(([size, name]) => ({ size: parseInt(size, 10), name }))
        .reduce((acc: Directory, { size, name }) => ({
          ...acc,
          [['/', ...workingDir, name].join('/')]: size
        }), {})
    },
    workingDir,
    allDirs,
  };
}

const aggregateSizes = ({ directory, allDirs }: DirectoryState) => allDirs
  .map((dir) => Object
    .entries(directory)
    .filter(([key]) => key.includes(`/${dir}/`))
    .reduce((acc, [_, value]) => acc + value, 0));

export const parseInput = (input: string) => aggregateSizes(input
  .split('\n')
  .map((line) => line.split(' '))
  .reduce(groupCommands, [])
  .reduce(executeCommand, { workingDir: [], allDirs: [], directory: {} }));

export const executePart1 = (sizes: number[]) => sizes
  .filter((v) => v < 100000)
  .reduce((a, b) => a + b);

export const executePart2 = (sizes: number[]) => {
  sizes.sort((a, b) => a - b);
  const required = 30000000 - (70000000 - sizes[sizes.length - 1]);

  return sizes
    .find((n) => n > required)
};
