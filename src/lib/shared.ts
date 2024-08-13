export interface ISettingsPayload {
  v: number[];
  h: boolean;
  pdg: boolean;
  u: string;
  mg: number;
}

export function generateNumber(
  min: number,
  max: number,
  exclude: number[] = [],
): number {
  const numbers = Array.from(
    { length: max - min + 1 },
    (_, i) => i + min,
  ).filter((num) => !exclude.includes(num));

  return numbers[Math.floor(Math.random() * numbers.length)];
}

export function safeValue(value: any) {
  if (!value) return "";
  return value;
}
