import type { CSSProperties } from "react";

export function X(spacing?: number) {
  return {
    className: "X",
    style: {
      "--X-spacing": `${spacing}rem`,
    } as CSSProperties,
  };
}

export function Y(spacing?: number) {
  return {
    className: "Y",
    style: {
      "--Y-spacing": `${spacing}rem`,
    } as CSSProperties,
  };
}
