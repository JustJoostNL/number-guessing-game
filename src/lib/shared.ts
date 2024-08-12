export interface ISettingsPayload {
  v: number[];
  h: boolean;
  mg: number;
}

export function generateNumber(
  min: number,
  max: number,
  exclude: number[] = [],
): number {
  // const random = Math.floor(Math.random() * (max - min + 1)) + min;
  // return exclude.includes(random) ? generateNumber(min, max, exclude) : random;

  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  for (const num of exclude) {
    const index = numbers.indexOf(num);

    if (index !== -1) {
      numbers.splice(index, 1);
    }
  }

  return numbers[Math.floor(Math.random() * numbers.length)];
}
