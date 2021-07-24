import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import {
  loadHeroIcons,
  loadSimpleIcons,
  typeLoadedIconComponent,
} from "../view/icons";
import { CodeBlock } from "../view/code";

export let meta: MetaFunction = () => {
  return {
    title: "What not How: JavaScript Regenerated",
    description: "",
  };
};

export let links: LinksFunction = () => {
  return [];
};

const simpleIcons = [] as const;
const heroIcons = [
  "solid/user-group.svg",
  "solid/cog.svg",
  "solid/beaker.svg",
  "solid/map.svg",
  "solid/sun.svg",
  "solid/key.svg",
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

function WhatNowHowGraphic(): JSX.Element {
  return (
    <svg viewBox="0 0 180 80">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="6" fill="white">
        <LoadedIcon
          name="solid/cog.svg"
          width={12}
          height={12}
          x={10}
          y={12}
        />
        <text x="30" y="20">
          <tspan fontWeight="bold">How: </tspan>
          <tspan>Step by step process to get a solution</tspan>
        </text>

        <LoadedIcon
          name="solid/map.svg"
          width={12}
          height={12}
          x={10}
          y={32}
        />
        <text x="30" y="40">
          <tspan fontWeight="bold">What: </tspan>
          <tspan>Declaring just the key parts of my solution</tspan>
        </text>

        <LoadedIcon
          name="solid/user-group.svg"
          width={12}
          height={12}
          x={10}
          y={51}
        />
        <text x="30" y="60">
          <tspan fontWeight="bold">Why: </tspan>
          <tspan>Solving the actual problems of my users</tspan>
        </text>
      </g>
    </svg>
  );
}

export default function MessagePrimitivesPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Focus on what, not how</h1>
      <WhatNowHowGraphic />
    </main>
  );
}
