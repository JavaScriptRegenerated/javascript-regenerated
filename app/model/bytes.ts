export function countByteSize(input: string): number {
  const encoder = new TextEncoder();
  const view = encoder.encode(input);
  return view.length;
}
