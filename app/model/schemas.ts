export const types = {
  string: "string",
  number: "number",
  array: "array",
} as const;

function readString(name: string) {
  return {
    type: types.string,
    name,
  };
}

function readNumber(name: string) {
  return {
    type: types.number,
    name,
  };
}

function readArray(name: string, itemType: typeof types.string | typeof types.number) {
  return {
    type: types.array,
    name,
    itemType,
  };
}

export const read = {
  string: readString,
  number: readNumber,
  array: readArray,
};

export type SchemaMessagePrimitive = ReturnType<
  typeof readString | typeof readNumber
>;
export type SchemaMessage = ReturnType<
  typeof readString | typeof readNumber | typeof readArray
>;
export type SchemaReply = string | number;
// export type SchemaGenerator<Result> = Generator<ReturnType<typeof read.string>, Result, string> | Generator<ReturnType<typeof read.number>, Result, number>;
export type SchemaGenerator<Result> = Generator<
  SchemaMessage,
  Result,
  SchemaReply | any
>;

export function parseJSON<Result>(
  source: unknown,
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

    if (source instanceof Object && result.value.name in source) {
      if (result.value.type === types.string) {
        if (typeof (source as any)[result.value.name] === "string") {
          reply = (source as any)[result.value.name];
        }
      } else if (result.value.type === types.number) {
        if (typeof (source as any)[result.value.name] === "number") {
          reply = (source as any)[result.value.name];
        }
      } else if (result.value.type === types.array) {
        const itemType = result.value.itemType;
        if (Array.isArray((source as any)[result.value.name])) {
          const sanitizedItems = (source as any)[result.value.name].map((x: any) => typeof x === itemType ? x : null);
          reply = sanitizedItems;
        }
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

    if (result.value.type === types.string) {
      if (source.has(result.value.name)) {
        reply = source.get(result.value.name) as string;
      }
    } else if (result.value.type === types.number) {
      if (source.has(result.value.name)) {
        reply = parseFloat(source.get(result.value.name) as string);
      }
    }
  }
}
