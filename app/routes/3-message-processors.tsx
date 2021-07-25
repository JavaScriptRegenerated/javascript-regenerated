import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import {
  loadHeroIcons,
  loadSimpleIcons,
  typeLoadedIconComponent,
} from "../view/icons";

export let meta: MetaFunction = () => {
  return {
    title: "Message Primitives: JavaScript Regenerated",
    description: "",
  };
};

export let links: LinksFunction = () => {
  return [];
};

const simpleIcons = [] as const;
const heroIcons = [
  
  "solid/reply.svg",
  "solid/film.svg",
  "solid/play.svg",
  "solid/document.svg",
  "solid/document-text.svg",
  "solid/check-circle.svg",
  "solid/light-bulb.svg",
  "solid/thumb-up.svg",
  "solid/fast-forward.svg",
  "solid/search-circle.svg",
  "solid/gift.svg",
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

function MessageProcessorsGraphic(): JSX.Element {
  return (
    <svg viewBox="0 0 180 220">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="4" fill="white" letterSpacing={0.05}>
        <LoadedIcon
          name="solid/film.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(0)}
        />
        <text x={textIndent} y={textY(0)}>
          <tspan fontWeight="bold">They accept a generator function</tspan>
        </text>

        <LoadedIcon
          name="solid/document.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(1)}
        />
        <text x={textIndent} y={textY(1)}>
          <tspan fontWeight="bold">They initialise some sort of state</tspan>
        </text>

        <LoadedIcon
          name="solid/play.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(2)}
        />
        <text x={textIndent} y={textY(2)}>
          <tspan fontWeight="bold">They iterate though the generator, receiving messages</tspan>
        </text>

        <LoadedIcon
          name="solid/search-circle.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(3)}
        />
        <text x={textIndent} y={textY(3)}>
          <tspan fontWeight="bold">They check if they recognise the message</tspan>
        </text>

        <LoadedIcon
          name="solid/fast-forward.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(4)}
        />
        <text x={textIndent} y={textY(4)}>
          <tspan fontWeight="bold">Unrecognised messages are ignored, so skip to next message</tspan>
        </text>

        <LoadedIcon
          name="solid/light-bulb.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(5)}
        />
        <text x={textIndent} y={textY(5)}>
          <tspan fontWeight="bold">Recognised messages are processed</tspan>
        </text>
        <text x={textIndent} y={textY(5) + 8}>
          <tspan>e.g. Match regex, add number, append string, fetch URL.</tspan>
        </text>

        <LoadedIcon
          name="solid/document-text.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(6)}
        />
        <text x={textIndent} y={textY(6)}>
          <tspan fontWeight="bold">The state might change due to processing the message</tspan>
        </text>
        <text x={textIndent} y={textY(6) + 8}>
          <tspan>e.g. String was appended, number changed.</tspan>
        </text>

        <LoadedIcon
          name="solid/reply.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(7)}
        />
        <text x={textIndent} y={textY(7)}>
          <tspan fontWeight="bold">Reply to messages that expect one</tspan>
        </text>
        <text x={textIndent} y={textY(7) + 8}>
          <tspan>e.g. Return regex matches or fetch reponse.</tspan>
        </text>

        <LoadedIcon
          name="solid/play.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(8)}
        />
        <text x={textIndent} y={textY(8)}>
          <tspan fontWeight="bold">They keep iterating though the generator until it’s done</tspan>
        </text>

        <LoadedIcon
          name="solid/check-circle.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(9)}
        />
        <text x={textIndent} y={textY(9)}>
          <tspan fontWeight="bold">They might return the state or some sort of result</tspan>
        </text>
      </g>
    </svg>
  );
}

export default function MessageProcessorsPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Message Processors</h1>
      <MessageProcessorsGraphic />

      {/* <hr data-y="100vh" /> */}
    </main>
  );
}
