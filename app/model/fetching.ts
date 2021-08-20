export const identifiers = {
  getJSON: "getJSON",
} as const;

export function getJSON(url: string | URL) {
  return Object.freeze({
    type: identifiers.getJSON,
    url: url.toString(),
  });
}

export type FetchMessage = ReturnType<typeof getJSON>;
export type FetchReply = any;

export type FetchGenerator<Result> = Generator<
  FetchMessage,
  Result,
  FetchReply | undefined
>;

export async function fetchJSONComponent<Result>(
  generator: () => FetchGenerator<Result>,
  options: { baseURL?: URL, signal?: AbortSignal } = {}
) {
  const gen = generator();
  let reply: FetchReply | undefined;

  while (true) {
    const result = gen.next(reply);
    if (result.done) {
      return result.value;
    }

    reply = undefined;

    if (result.value.type === identifiers.getJSON) {
      const url = new URL(result.value.url, options.baseURL);
      const data = fetch(url.toString(), { signal: options.signal }).then(res => res.json());
      reply = await data;
    }
  }
}
