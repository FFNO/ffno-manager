export function calculatePage(total?: number) {
  return Math.ceil((total ?? 10) / 10);
}

export function getOptionListFromRecord(record: Record<number, string>) {
  return Object.entries(record).map(([value, label]) => ({ value, label }));
}
