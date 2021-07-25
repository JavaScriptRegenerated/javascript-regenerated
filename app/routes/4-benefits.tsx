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
const heroIcons = ["solid/check-circle.svg", "solid/x-circle.svg"] as const;
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

function GeneratorsWorkEverywhere(): JSX.Element {
  function renderCheckIcon(index: number) {
    return (
      <LoadedIcon
        name="solid/check-circle.svg"
        width={12}
        height={12}
        x={10}
        y={iconY(index)}
        color="#10B981"
      />
    );
  }
  function renderCrossIcon(index: number) {
    return (
      <LoadedIcon
        name="solid/x-circle.svg"
        width={12}
        height={12}
        x={10}
        y={iconY(index)}
        color="#FBBF24"
      />
    );
  }
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
        {renderCheckIcon(0)} {renderText(0, "Modern Browsers")}
        {renderCheckIcon(1)} {renderText(1, "Modern Cloud Servers")}
        {renderCheckIcon(2)} {renderText(2, "TypeScript & JSDoc")}
        {renderCheckIcon(3)} {renderText(3, "Modern IDEs like VS Code")}
        {renderCheckIcon(4)} {renderText(4, "Code formatters & linters")}
        {renderCrossIcon(5)} {renderText(5, "Internet Explorer (except via Babel)")}
      </g>
    </svg>
  );
}

export default function ScriptsPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>JavaScript is Everywhere</h1>
      <JavaScriptEverywhere />

      <hr data-y="100vh" />

      <h2>Generators have amazing support</h2>
      <GeneratorsWorkEverywhere />
    </main>
  );
}
