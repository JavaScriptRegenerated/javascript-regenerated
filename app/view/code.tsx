import { useLayoutEffect, useRef } from "react";

export function CodeBlock(props: {
  language: "json" | "css" | "html" | "sql" | "javascript" | "objc" | "ruby";
  children: string;
  smaller?: true
}): JSX.Element {
  const elRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (elRef.current) {
      elRef.current.classList.add(`lang-${props.language}`);
      (window as any).Prism.highlightElement(elRef.current);
    }
  }, [props.children]);

  return (
    <pre data-text={props.smaller ? "-2" : undefined}>
      <code ref={elRef}>{props.children}</code>
    </pre>
  );
}
