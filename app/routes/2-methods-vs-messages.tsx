import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import {
  loadHeroIcons,
  loadSimpleIcons,
  typeLoadedIconComponent,
} from "../view/icons";
import { CodeBlock } from "../view/code";

export let meta: MetaFunction = () => {
  return {
    title: "Methods vs Messages: JavaScript Regenerated",
    description: "",
  };
};

export let links: LinksFunction = () => {
  return [];
};

const textIndent = 30;
const textY = (index: number) => index * 20 + 20;
const iconY = (index: number) => index * 20 + 12;

const simpleIcons = [] as const;
const heroIcons = ["solid/annotation.svg", "solid/cog.svg"] as const;

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

function MethodsVsPrimitivesCode() {
  return (
    <>
      <h2>JavaScript classes allow calling methods</h2>
      <CodeBlock language="javascript" smaller>
        {`
class Counter {
  add(amount) {
    // Code I write
  }
}

const counter = new Counter();
// Call add method.
counter.add(1);
`.trim()}
      </CodeBlock>
      <h2>Objective-C classes allow sending messages</h2>
      <CodeBlock language="objc" smaller>
        {`
// Send add message.
[counter add:@1];

// Here is the identifier for this message.
SEL messageIdentifier = @selector(add:);

// Send add message.
[counter performSelector:@selector(add:) withObject:@1];

// Create message ready to send.
// Yes, it is a fair amount of code…
NSMethodSignature *signature = [Counter
  instanceMethodSignatureForSelector:@selector(add:)];
NSInvocation *sender = [NSInvocation
  invocationWithMethodSignature:signature];
NSNumber *amount = @1;
[sender setArgument:&amount atIndex:2];
[sender setTarget:counter];

// Now, let’s send the add message twice.
[sender invoke];
[sender invoke];
`.trim()}
      </CodeBlock>
    </>
  );
}

function GeneratorComponentsPiecesGraphic(): JSX.Element {
  return (
    <svg viewBox="0 0 180 60">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="6" fill="white" letterSpacing={0.05}>
        <LoadedIcon
          name="solid/annotation.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(0)}
        />
        <text x={textIndent} y={textY(0)}>
          <tspan fontWeight="bold">Message generators: </tspan>
        </text>
        <text x={textIndent} y={textY(0) + 8}>
          <tspan>Generators functions that send messages.</tspan>
        </text>

        <LoadedIcon
          name="solid/cog.svg"
          width={12}
          height={12}
          x={10}
          y={iconY(1)}
        />
        <text x={textIndent} y={textY(1)}>
          <tspan fontWeight="bold">Message processors: </tspan>
        </text>
        <text x={textIndent} y={textY(1) + 8}>
          <tspan>
            Calls the above and transform its messages into a result.
          </tspan>
        </text>
      </g>
    </svg>
  );
}

function GeneratorComponentsPiecesCode(): JSX.Element {
  return (
    <>
      <h2>Adding sent numbers</h2>
      <CodeBlock language="javascript" smaller>
        {`
// This is our message generator:
function* GenerateNumbers() {
  yield 1; // These
  yield 2; // are
  yield 3; // our messages
}

// This is our message processor:
function adder(messageGenerator) {
  let total = 0;
  for (const message of messageGenerator()) {
    total += message;
  }
  return total;
}

adder(GenerateNumbers);
// 6
`.trim()}
      </CodeBlock>
    </>
  );
}

export default function MethodsVsPrimitivesPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Methods vs Messages</h1>
      <MethodsVsPrimitivesCode />

      <hr data-y="100vh" />

      <GeneratorComponentsPiecesGraphic />
      <GeneratorComponentsPiecesCode />
    </main>
  );
}
