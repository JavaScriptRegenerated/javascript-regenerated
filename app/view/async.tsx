import { useEffect, useMemo, useState } from "react";

export function usePromise<Data>(source: Promise<Data>): null | Data {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    setData(null);
    source.then(setData);
  }, [source]);

  return data;
}

export function useAsyncFunc<Data>(
  source: () => Promise<Data>,
  dependencies: Array<any>
): null | Data {
  const promise = useMemo(source, dependencies);
  return usePromise(promise);
}
