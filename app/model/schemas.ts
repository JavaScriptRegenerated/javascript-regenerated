export const identifiers = {
  string: "string",
  number: "number",
} as const;

export const read = {
  string: (name: string) => ({
    type: identifiers.string,
    name,
  }),
  number: (name: string) => ({
    type: identifiers.number,
    name,
  }),
};

export type SchemaMessage = ReturnType<typeof read.string | typeof read.number>;
export type SchemaReply = string | number;
// export type SchemaGenerator<Result> = Generator<ReturnType<typeof read.string>, Result, string> | Generator<ReturnType<typeof read.number>, Result, number>;
export type SchemaGenerator<Result> = Generator<
  SchemaMessage,
  Result,
  SchemaReply | any
>;

export function parseSchema<Result>(
  source: Record<string, any>,
  generator: () => SchemaGenerator<Result>
) {
  const gen = generator();
  let reply: SchemaReply | undefined;

  while (true) {
    const result = gen.next(reply ?? ("" as any));
    if (result.done) {
      return result.value;
    }

    reply = undefined;

    if (result.value.type === identifiers.string) {
      if (typeof source[result.value.name] === "string") {
        reply = source[result.value.name];
      }
    } else if (result.value.type === identifiers.number) {
      if (typeof source[result.value.name] === "number") {
        reply = source[result.value.name];
      }
    }
  }
}

export function parseFormData<Result>(
  source: FormData,
  generator: () => SchemaGenerator<Result>
) {
  const gen = generator();
  let reply: SchemaReply | undefined;

  while (true) {
    const result = gen.next(reply ?? ("" as any));
    if (result.done) {
      return result.value;
    }

    reply = undefined;

    if (result.value.type === identifiers.string) {
      if (source.has(result.value.name)) {
        reply = source.get(result.value.name) as string;
      }
    } else if (result.value.type === identifiers.number) {
      if (source.has(result.value.name)) {
        reply = parseFloat(source.get(result.value.name) as string);
      }
    }
  }
}
