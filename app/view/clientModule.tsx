import { useState } from "react";
import { useLayoutEffect } from "react";

export function ClientModule({ source }: { source: string }): JSX.Element {
  return <script type="module" dangerouslySetInnerHTML={{ __html: source }} />;
}

export function useClientScript(scriptEl: JSX.Element) {
  const [loaded, updateLoaded] = useState(false);

  useLayoutEffect(() => {
    const script = document.createElement("script");
    Object.assign(script, scriptEl.props);
    script.addEventListener("load", () => {
      updateLoaded(true);
    });
    document.body.appendChild(script);
  }, []);

  return loaded;
}