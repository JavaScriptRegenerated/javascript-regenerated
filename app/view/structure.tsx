import type { CSSProperties } from "react";

export function X(spacing?: number) {
  return {
    className: "X",
    style: {
      "--X-spacing": `${spacing}rem`,
    } as CSSProperties,
  };
}
