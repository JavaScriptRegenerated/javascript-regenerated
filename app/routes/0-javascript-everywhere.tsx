import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import * as React from "react";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Linear Reasoning: JavaScript Regenerated",
    description: "",
  };
};

export let links: LinksFunction = () => {
  return [];
};

function fetchSimpleIcon(name: string) {
  return fetch(
    // `https://collected.systems/1/github/simple-icons/simple-icons/5.7.0/icons/${name}`
    `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@5.7.0/icons/${name}`,
    { cache: "force-cache" }
  ).then((res) => res.text());
}

const simpleIcons = [
  "twitter.svg",
  "googlechrome.svg",
  "amazonaws.svg",
  "cloudflare.svg",
] as const;

export let loader: LoaderFunction = async () => {
  return {
    icons: Object.fromEntries(
      await Promise.all(
        function* () {
          for (const name of simpleIcons) {
            yield fetchSimpleIcon(name).then((code) => [name, code]);
          }
        }.call(null)
      )
    ),
  };
};

function LoadedIcon({
  name,
  ...rest
}: {
  name: typeof simpleIcons[-1];
} & Pick<React.SVGProps<SVGElement>, "width" | "height" | "x" | "y">) {
  const { icons } = useRouteData();

  return <svg {...rest} dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

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
        />
        <text x="30" y="20">
          <tspan fontWeight="bold">Browsers: </tspan>
          {`Firefox, Edge, Safari, Chrome`}
        </text>

        <LoadedIcon name="amazonaws.svg" width={12} height={12} x={10} y={32} />
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
      <h2>JavaScript is Everywhere</h2>
      <JavaScriptEverywhere />

      <hr data-y="100vh" />
    </main>
  );
}
