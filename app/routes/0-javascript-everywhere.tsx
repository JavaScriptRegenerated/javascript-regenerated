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

const simpleIcons = [
  "googlechrome.svg",
  "amazonaws.svg",
  "cloudflare.svg",
] as const;

export let loader: LoaderFunction = async () => {
  return {
    icons: {
      ...(await loadSimpleIcons(simpleIcons)),
    },
  };
};

const LoadedIcon = typeLoadedIconComponent<typeof simpleIcons[-1]>();

function JavaScriptEverywhere(): JSX.Element {
  return (
    <svg viewBox="0 0 180 80">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="6" fill="white">
        <LoadedIcon
          name="googlechrome.svg"
          width={12}
          height={12}
          x={10}
          y={12}
          fill="currentColor"
        />
        <text x="30" y="20">
          <tspan fontWeight="bold">Browsers: </tspan>
          {`Firefox, Edge, Safari, Chrome`}
        </text>

        <LoadedIcon
          name="amazonaws.svg"
          width={12}
          height={12}
          x={10}
          y={32}
          fill="currentColor"
        />
        <text x="30" y="40">
          <tspan fontWeight="bold">Cloud: </tspan>
          {`Node.js, Lambda, Containers`}
        </text>

        <LoadedIcon
          name="cloudflare.svg"
          width={12}
          height={12}
          x={10}
          y={51}
          fill="currentColor"
        />
        <text x="30" y="60">
          <tspan fontWeight="bold">Edge: </tspan>
          {`Cloudflare Workers, Deno Deploy, Fastly`}
        </text>
      </g>
    </svg>
  );
}

export default function ScriptsPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>JavaScript is Everywhere</h1>
      <JavaScriptEverywhere />
    </main>
  );
}
