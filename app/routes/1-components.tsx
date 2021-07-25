import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import * as React from "react";
import { useRouteData } from "remix";
import {
  loadHeroIcons,
  loadSimpleIcons,
  typeLoadedIconComponent,
} from "../view/icons";

export let meta: MetaFunction = () => {
  return {
    title: "Linear Reasoning: JavaScript Regenerated",
    description: "",
  };
};

export let links: LinksFunction = () => {
  return [];
};

const simpleIcons = [] as const;
const heroIcons = [
  "solid/tag.svg",
  "solid/scissors.svg",
  "solid/backspace.svg",
  "solid/adjustments.svg",
  "solid/clock.svg",
  "solid/identification.svg",
  "solid/refresh.svg",
  "solid/cursor-click.svg",
  "solid/check-circle.svg",
  "solid/exclamation.svg",
  "solid/pencil.svg",
  "solid/sparkles.svg",
] as const;
export let loader: LoaderFunction = async () => {
  return {
    icons: {
      ...(await loadSimpleIcons(simpleIcons)),
      ...(await loadHeroIcons(heroIcons)),
    },
  };
};

const LoadedIcon = typeLoadedIconComponent<
  typeof simpleIcons[-1] | typeof heroIcons[-1]
>();

const textIndent = 30;
const textY = (index: number) => index * 20 + 20;
const iconY = (index: number) => index * 20 + 12;

function SemanticLayerGraphic(): JSX.Element {
  function renderText(index: number, text: string) {
    return (
      <text x={textIndent} y={textY(index)}>
        <tspan fontWeight="bold">{text}</tspan>
      </text>
    );
  }

  return (
    <svg viewBox="0 0 180 140">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="6" fill="white">
        <LoadedIcon
          name="solid/tag.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(0)}
        />
        {renderText(0, "Components are the new semantic layer")}
        <text x={textIndent} y={textY(0) + 8}>
          <tspan>{"from <PrimaryButton> to <App>"}</tspan>
        </text>

        <LoadedIcon
          name="solid/adjustments.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(1)}
        />
        {renderText(1, "They are easy to change")}

        <LoadedIcon
          name="solid/backspace.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(2)}
        />
        {renderText(2, "They are easy to delete")}

        <LoadedIcon
          name="solid/scissors.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(3)}
        />
        {renderText(3, "They are easy to divide up")}

        <LoadedIcon
          name="solid/clock.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(4)}
        />
        {renderText(4, "They are easier to debug")}

        <LoadedIcon
          name="solid/identification.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(5)}
        />
        {renderText(5, "They represent meaningful concepts")}
      </g>
    </svg>
  );
}

function ComponentModelGraphic(): JSX.Element {
  function renderText(index: number, text: string) {
    return (
      <text x={textIndent} y={textY(index)}>
        <tspan fontWeight="bold">{text}</tspan>
      </text>
    );
  }

  return (
    <svg viewBox="0 0 180 140">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="6" fill="white">
        <LoadedIcon
          name="solid/sparkles.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(0)}
        />
        {renderText(0, "Define your component and the system runs them")}

        <LoadedIcon
          name="solid/refresh.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(1)}
        />
        {renderText(1, "Initially: runs component from top-to-bottom")}

        <LoadedIcon
          name="solid/cursor-click.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(2)}
        />
        {renderText(2, "When user taps: runs top-to-bottom")}

        <LoadedIcon
          name="solid/check-circle.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(3)}
        />
        {renderText(3, "When API request succeeds: runs top-to-bottom")}

        <LoadedIcon
          name="solid/exclamation.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(4)}
        />
        {renderText(4, "When API request fails: runs top-to-bottom")}

        <LoadedIcon
          name="solid/pencil.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(5)}
        />
        {renderText(5, "When any state changes: runs top-to-bottom")}
      </g>
    </svg>
  );
}

export default function ScriptsPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Why Components?</h1>
      <SemanticLayerGraphic />

      <hr data-y="100vh" />

      <ComponentModelGraphic />
    </main>
  );
}
