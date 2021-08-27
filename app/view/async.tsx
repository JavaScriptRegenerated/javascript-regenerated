import { useEffect, useReducer, useState } from "react";

export function useAsyncFunc<Data>(
  source: (signal: AbortSignal) => Promise<Data>,
  dependencies: Array<unknown>
): readonly [null | Data, { requestCount: number, completedCount: number }] {
  const [state, setState] = useState<{ requestCount: number; completedCount: number; data: Data | null }>({
    requestCount: 0,
    completedCount: 0,
    data: null
  });

  useEffect(() => {
    const aborter = new AbortController();

    setState(state => ({ ...state, requestCount: state.requestCount + 1 }));
    source(aborter.signal).then(data => {
      setState(state => ({ ...state, completedCount: state.completedCount + 1, data }))
    });

    return () => aborter.abort();
  }, dependencies);

  return Object.freeze([state.data, state] as const);
}

export function useAsyncAction<Data>(
  source: (signal: AbortSignal) => Promise<Data>
): readonly [() => void, { data: null | Data, requestCount: number, completedCount: number }] {
  const [requestCount, request] = useReducer((n) => n + 1, 0);
  const [data, result] = useAsyncFunc(
    async (signal) => (requestCount > 0 ? source(signal) : null),
    [requestCount]
  );
  return Object.freeze([request, { data, requestCount, completedCount: result.completedCount }] as const);
}
