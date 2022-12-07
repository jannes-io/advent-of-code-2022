interface File {
  size: number;
  name: string;
}

type Directory = Record<string, (Directory | File)[]>;

interface Command {
  command: string;
  args: string;
  stdout: string[][];
}

interface DirectoryDiscoveryState {
  workingDir: string[];
  directory: Directory;
}

const initialDirectoryDiscoveryState: DirectoryDiscoveryState = {
  workingDir: [],
  directory: {},
}

export const parseInput = (input: string) => {
  const lines = input
    .split('\n')
    .map((line) => line.split(' '))
    .reduce((commands, line) => line[0] === '$'
      ? [...commands, { command: line[1], args: line.slice(2), stdout: [] }]
      : commands[commands.length - 1].stdout.push(line) && commands, [] as Command[])
    .reduce(({ workingDir, directory }, { command, args, stdout }) => {
      if (command === 'cd') {
        if (args[0] === '..') {
          return ({ directory, workingDir: workingDir.slice(-1) })
        }
        return ({ directory, workingDir: [...workingDir, args[0]] })
      }

    }, initialDirectoryDiscoveryState);

  return lines;
};

export const executePart1 = (input: unknown) => console.dir(input, { depth: null });
export const executePart2 = (input: unknown) => {
};
