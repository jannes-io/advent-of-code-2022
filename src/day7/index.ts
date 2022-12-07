interface Link {
  name: string;
  type: 'dir' | 'file';
}

interface File extends Link {
  type: 'file';
  size: number;
}

interface Directory extends Link {
  type: 'dir';
  contents: Array<File | Directory>;
}

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
  workingDir: ['/'],
  directory: { name: '/', type: 'dir', contents: [] },
}

// nothing to see here :eyes:
const insertIntoDirectory = (directory: Directory, path: string[]) => (file: File) => {
  let workingDirectory = directory;
  if (path.length === 1) {
    workingDirectory.contents.push(file);
    return;
  }

  path.slice(1).forEach((segment, i) => {
    let subDirectory = workingDirectory.contents.find(({
      name,
      type
    }) => name === segment && type === 'dir');
    if (subDirectory === undefined) {
      subDirectory = { name: segment, type: 'dir', contents: [] };
      workingDirectory.contents.push(subDirectory);
    }
    workingDirectory = subDirectory as Directory;
    if (i === path.length - 2) {
      workingDirectory.contents.push(file);
    }
  });
}

const groupCommands = (commands: Command[], line: string[]) => line[0] === '$'
  ? [...commands, { command: line[1], args: line.slice(2), stdout: [] as string[] }]
  : commands[commands.length - 1].stdout.push(line) && commands

const executeCommand = ({ directory, workingDir }: DirectoryDiscoveryState, {
  command,
  args,
  stdout,
}: Command) => {
  if (command === 'cd') {
    return args[0] === '..'
      ? { directory, workingDir: workingDir.slice(0, -1) }
      : { directory, workingDir: [...workingDir, args[0]] }
  }

  stdout
    .filter(([v]) => v !== 'dir')
    .map(([size, name]) => ({ name, size: parseInt(size, 10), type: 'file' }))
    .forEach(insertIntoDirectory(directory, workingDir));

  return { directory, workingDir };
}

export const parseInput = (input: string) => input
  .split('\n')
  .slice(1)
  .map((line) => line.split(' '))
  .reduce(groupCommands, [] as Command[])
  .reduce(executeCommand, initialDirectoryDiscoveryState)
  .directory;

interface SizedDir {
  size: number;
  dirs: SizedDir[];
}

const sum = (a: number, b: number) => a + b;

const calculateSize = (directory: Directory): SizedDir => {
  const dirs = directory.contents
    .filter((file): file is Directory => file.type === 'dir')
    .map(calculateSize);

  const subDirsSize = dirs
    .map(({ size }) => size)
    .reduce(sum, 0);

  const size = subDirsSize + directory.contents
    .filter((file): file is File => file.type === 'file')
    .map(({ size }) => size)
    .reduce(sum, 0);

  return { size, dirs };
}

const flatten = (dir: SizedDir, sizes: number[] = []): number[] => dir.dirs.length === 0
  ? [...sizes, dir.size]
  : [
    dir.size,
    ...sizes,
    ...dir.dirs.reduce((acc, inner) => [...acc, ...flatten(inner)], [])
  ];

export const executePart1 = (input: Directory) => flatten(calculateSize(input))
  .filter((v) => v < 100000)
  .reduce(sum);

export const executePart2 = (input: Directory) => {
  const sized = calculateSize(input);
  const required = 30000000 - (70000000 - sized.size);
  return flatten(sized)
    .sort((a, b) => a - b)
    .find((n) => n > required);
};
