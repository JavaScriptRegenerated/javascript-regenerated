import { useEffect, useState } from "react";

export function useAsyncFunc<Data>(
  source: (signal: AbortSignal) => Promise<Data>,
  dependencies: Array<any>
): null | Data {
  const [data, setData] = useState<Data | null>(null);
  
  useEffect(() => {
    const aborter = new AbortController();
    
    setData(null);
    source(aborter.signal).then(setData);

    return () => aborter.abort();
  }, dependencies);

  return data;
}
