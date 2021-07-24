import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { CodeBlock } from "../view/code";

export let meta: MetaFunction = () => {
  return {
    title: "Linear Reasoning: JavaScript Regenerated",
    description: "",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return {};
};

function renderDigit(text: string, offsetY: number) {
  return (
    <>
      <text x={15} y={offsetY} textAnchor="middle">
        {text}
      </text>
      <circle cx={15} cy={offsetY - 3.5} r={8} fill="white" fillOpacity={0.25} />
    </>
  );
}

function LinearScriptGraphic(): JSX.Element {
  return (
    <svg viewBox="0 0 180 80">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="10" fill="white">
        {renderDigit("1", 20)}
        <text x="30" y="20">
          {`text = user.askInput()`}
        </text>

        {renderDigit("2", 40)}
        <text x="30" y="40">
          {`text = text.uppercase`}
        </text>

        {renderDigit("3", 60)}
        <text x="30" y="60">
          {`user.show(text)`}
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
      <h2>Scripts are Linear</h2>
      <LinearScriptGraphic />
      <p>The script is run in order: 1, 2, 3.</p>

      <hr data-y="100vh" />
      <h2>Components are Linear</h2>
      <LinearComponentGraphic />
    </main>
  );
}
