export function calculatePage(total?: number) {
  return Math.ceil((total ?? 10) / 10);
}
