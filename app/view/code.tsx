import { useLayoutEffect, useRef } from "react";

export function CodeBlock(props: {
  language: "json" | "javascript" | "css" | "html";
  children: string;
}): JSX.Element {
  const elRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (elRef.current) {
      elRef.current.classList.add(`lang-${props.language}`);
      (window as any).Prism.highlightElement(elRef.current);
    }
  }, [props.children]);

  return (
    <pre>
      <code ref={elRef}>{props.children}</code>
    </pre>
  );
}
