import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { CodeBlock } from "../view/code";
import { loadHeroIcons, typeLoadedIconComponent } from "../view/icons";

export let meta: MetaFunction = () => {
  return {
    title: "Linear Reasoning: JavaScript Regenerated",
    description: "",
  };
};

export let links: LinksFunction = () => {
  return [];
};

const heroIcons = ["solid/tag.svg", "solid/refresh.svg"] as const;

export let loader: LoaderFunction = async () => {
  return {
    icons: {
      ...(await loadHeroIcons(heroIcons)),
    },
  };
};

const LoadedIcon = typeLoadedIconComponent<typeof heroIcons[-1]>();

function renderDigit(text: string, offsetY: number) {
  return (
    <>
      <text x={15} y={offsetY} textAnchor="middle">
        {text}
      </text>
      <circle
        cx={15}
        cy={offsetY - 3.5}
        r={8}
        fill="white"
        fillOpacity={0.25}
      />
    </>
  );
}

const textIndent = 30;
const textY = (index: number) => index * 20 + 20;
const iconY = (index: number) => index * 20 + 12;

function HardestThingsGraphic(): JSX.Element {
  return (
    <svg viewBox="0 0 180 80">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="8" fill="white">
        <LoadedIcon
          name="solid/tag.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(0)}
        />
        <text x={textIndent} y={textY(0)}>
          <tspan fontWeight="bold">Naming</tspan>
        </text>

        <LoadedIcon
          name="solid/refresh.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(1)}
        />
        <text x={textIndent} y={textY(1)}>
          <tspan fontWeight="bold">Cache invalidation</tspan>
        </text>

        <text x="8" y={textY(2)}>
          {`Components force teams to tackle both!`}
        </text>
      </g>
    </svg>
  );
}

function LinearComponentGraphic(): JSX.Element {
  return (
    <svg viewBox="0 0 180 80">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="10" fill="white">
        {renderDigit("1", 20)}
        <text x="30" y="20">
          {`let text = props.text`}
        </text>

        {renderDigit("2", 40)}
        <text x="30" y="40">
          {`text = text.uppercase`}
        </text>

        {renderDigit("3", 60)}
        <text x="30" y="60">
          {`return <p>{text}</p>`}
        </text>
      </g>
    </svg>
  );
}

export default function ScriptsPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Two hardest things</h1>
      <HardestThingsGraphic />
    </main>
  );
}
