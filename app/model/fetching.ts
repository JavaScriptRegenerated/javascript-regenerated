export const identifiers = {
  getJSON: "getJSON",
  postJSON: "postJSON",
  deleteJSON: "deleteJSON",
} as const;

export function getJSON(url: string | URL) {
  return Object.freeze({
    type: identifiers.getJSON,
    url: url.toString(),
  });
}

export function postJSON(
  url: string | URL,
  body?: Parameters<typeof JSON.stringify>[0]
) {
  return Object.freeze({
    type: identifiers.postJSON,
    url: url.toString(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function deleteJSON(url: string | URL) {
  return Object.freeze({
    type: identifiers.deleteJSON,
    url: url.toString(),
  });
}

export type FetchMessage = ReturnType<
  typeof getJSON | typeof postJSON | typeof deleteJSON
>;
export type FetchReply = any;

export type FetchGenerator<Result> = Generator<
  FetchMessage,
  Result,
  FetchReply | undefined
>;

export async function fetchComponent<Result>(
  generator: () => FetchGenerator<Result>,
  options: { baseURL?: URL; signal?: AbortSignal } = {}
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
      const data = fetch(url.toString(), { signal: options.signal }).then(
        (res) => res.json()
      );
      reply = await data;
    } else if (result.value.type === identifiers.postJSON) {
      const url = new URL(result.value.url, options.baseURL);
      console.log("POSTING!");
      const data = fetch(url.toString(), {
        method: "post",
        body: result.value.body,
        signal: options.signal,
      }).then((res) => res.json());
      reply = await data;
    } else if (result.value.type === identifiers.deleteJSON) {
      const url = new URL(result.value.url, options.baseURL);
      console.log("DELETEING!");
      const data = fetch(url.toString(), {
        method: "delete",
        signal: options.signal,
      }).then((res) => res.json());
      reply = await data;
    }
  }
}
