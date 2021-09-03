import { useEffect, useReducer, useState } from "react";

export function useAsyncFunc<Data>(
  source: (signal: AbortSignal) => Promise<Data> | null,
  dependencies: Array<unknown>
): readonly [null | Data, { startCount: number; completedCount: number }] {
  interface State {
    startCount: number;
    completedCount: number;
    data: Data | null;
  }
  const [state, setState] = useState<State>({
    startCount: 0,
    completedCount: 0,
    data: null,
  });

  useEffect(() => {
    const aborter = new AbortController();
    const promise = source(aborter.signal);
    if (!promise) {
      return;
    }

    setState((state) => ({
      ...state,
      startCount: state.startCount + 1,
      data: null,
    }));
    promise.then((data) => {
      setState((state) => ({
        ...state,
        completedCount: state.completedCount + 1,
        data,
      }));
    });

    return () => aborter.abort();
  }, dependencies);

  return Object.freeze([state.data, state] as const);
}

export function useAsyncAction<Data>(
  source: (signal: AbortSignal) => Promise<Data>
): readonly [
  () => void,
  { data: null | Data; requestCount: number; completedCount: number }
] {
  const [requestCount, request] = useReducer((n) => n + 1, 0);
  const [data, result] = useAsyncFunc(
    (signal) => (requestCount > 0 ? source(signal) : null),
    [requestCount]
  );
  return Object.freeze([
    request,
    { data, requestCount, completedCount: result.completedCount },
  ] as const);
}
