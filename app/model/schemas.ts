export const identifiers = {
  stringProperty: "stringProperty"
} as const;

export const out = {
  string: (name: string) => ({
    type: identifiers.stringProperty,
    name,
  }),
};

export type RenderingMessage = ReturnType<typeof out.string>;

export function* processJSON(json: Record<string, any>, generator: () => Generator<RenderingMessage, void, void>) {
  let lastValue: any | undefined;
  const gen = generator();
  while (true) {
    const result = gen.next(lastValue);
    if (result.done) break;

    if (result.value.type === identifiers.stringProperty) {
      if (result.value.name in json) {
        lastValue = json[result.value.name];
      }
    }
  }
}
