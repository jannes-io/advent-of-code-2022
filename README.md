#### Instructions

This TypeScript AOC repo has a tiny framework to easily run days.

To add a day, create a directory in `src` named `day<#>` with an `index.ts` that has the following content:

```typescript
/* /src/day1/index.ts */
export const parseInput = (input: string) => '';

export const executePart1 = (input: unknown) => 0;

export const executePart2 = (input: unknown) => 0;
```

For input, add a file `/input/<#>.txt` and include your input.

#### Scripts
- `npm watch-ts` to start typescript builder
- `npm run day` to select a day to run 
- `npm run day <#>` shortcut for the above without interaction
