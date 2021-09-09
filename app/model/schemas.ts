export const types = {
  string: "string",
  number: "number",
  boolean: "boolean",
  array: "array",
  object: "object",
} as const;

function readString(name?: string) {
  return {
    type: types.string,
    name,
  };
}

function readNumber(name?: string) {
  return {
    type: types.number,
    name,
  };
}

function readBoolean(name?: string) {
  return {
    type: types.boolean,
    name,
  };
}

function readArray<Inner = unknown>(
  name: string,
  itemType: SchemaMessagePrimitive | (() => SchemaGenerator<Inner>)
) {
  return {
    type: types.array,
    name,
    itemType,
  };
}

function readObject(name: string, itemType: SchemaMessagePrimitive) {
  return {
    type: types.array,
    name,
    itemType,
  };
}

export const read = {
  string: readString,
  number: readNumber,
  boolean: readBoolean,
  array: readArray,
  object: readObject,
};

export type SchemaMessagePrimitive = ReturnType<
  typeof readString | typeof readNumber | typeof readBoolean
>;
export type SchemaMessage<Inner = unknown> =
  | SchemaMessagePrimitive
  | {
      type: "array";
      name: string;
      itemType: SchemaMessagePrimitive | (() => SchemaGenerator<Inner>);
    }
  | (() => SchemaGenerator<Inner>);
export type SchemaReply =
  | string
  | number
  | boolean
  | Array<unknown>
  | Record<string, unknown>;
// export type SchemaGenerator<Result> = Generator<ReturnType<typeof read.string>, Result, string> | Generator<ReturnType<typeof read.number>, Result, number>;
export type SchemaGenerator<Result> = Generator<
  SchemaMessage,
  Result,
  SchemaReply | unknown
>;

export function parseJSON<Result>(
  source: unknown,
  message: SchemaMessage<Result>
):
  | null
  | string
  | number
  | boolean
  | Array<unknown>
  | Record<string, unknown>
  | Result {
  if (typeof message === "function") {
    const gen = message();
    let reply: SchemaReply | undefined;

    while (true) {
      const result = gen.next(reply ?? ("" as any));
      if (result.done) {
        return result.value;
      }
      const value = result.value;

      reply = undefined;

      if (source instanceof Object && 'name' in value && typeof value.name === 'string' && value.name in source) {
        reply = parseJSON((source as any)[value.name], value) as any;

        if (typeof value === "function") {
          // TODO
        } else if (value.type === types.array) {
          const itemType = value.itemType;
          if (Array.isArray((source as any)[value.name])) {
            const sanitizedItems = (source as any)[value.name].map((x: any) =>
              parseJSON(x, itemType)
            );
            reply = sanitizedItems;
          }
        }
      }
    }
  } else if (message.type === types.string) {
    if (typeof source === "string") {
      return source;
    }
  } else if (message.type === types.number) {
    if (typeof source === "number") {
      return source;
    }
  } else if (message.type === types.boolean) {
    if (typeof source === "boolean") {
      return source;
    }
  } else if (message.type === types.array) {
    if (Array.isArray(source)) {
      return source.map((item) => parseJSON(item, message.itemType));
    }
  }

  return null;
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
    // TODO: handle boolean
  }
}
