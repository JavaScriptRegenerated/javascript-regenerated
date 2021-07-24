import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import {
  loadHeroIcons,
  loadSimpleIcons,
  typeLoadedIconComponent,
} from "../view/icons";
import { CodeBlock } from "../view/code";

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
  "solid/phone-incoming.svg",
  "solid/phone-outgoing.svg",
  "solid/inbox-in.svg",
  "solid/reply.svg",
  "solid/chat.svg",
  "solid/check-circle.svg",
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

function MessagePrimitivesGraphic(): JSX.Element {
  return (
    <svg viewBox="0 0 180 80">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="6" fill="white">
        <LoadedIcon
          name="solid/chat.svg"
          width={12}
          height={12}
          x={10}
          y={12}
        />
        <text x="30" y="20" fontFamily="var(--font-mono)">
          <tspan fontWeight="bold">Send: </tspan>
          <tspan className="token keyword">yield</tspan>
          <tspan> </tspan>
          <tspan className="token string">"some string"</tspan>
        </text>

        <LoadedIcon
          name="solid/inbox-in.svg"
          width={12}
          height={12}
          x={10}
          y={32}
        />
        <text x="30" y="40" fontFamily="var(--font-mono)">
          <tspan fontWeight="bold">Receive: </tspan>
          <tspan className="token keyword">const</tspan>
          <tspan> reply </tspan>
          <tspan className="token operator">=</tspan>
          <tspan> </tspan>
          <tspan className="token keyword">yield</tspan>
          <tspan> </tspan>
          <tspan className="token string">"string"</tspan>
        </text>

        <LoadedIcon
          name="solid/check-circle.svg"
          width={12}
          height={12}
          x={10}
          y={51}
        />
        <text x="30" y="60" fontFamily="var(--font-mono)">
          <tspan fontWeight="bold">Return: </tspan>
          <tspan className="token keyword">return</tspan>
          <tspan> </tspan>
          <tspan className="token string">"final message"</tspan>
        </text>
      </g>
    </svg>
  );
}

function MessagePrimitivesCode() {
  return (
    <>
      <h2>JavaScript classes allow calling methods</h2>
      <CodeBlock language="javascript" smaller>
        {`
class Counter {
  incrementBy(amount) {
    // Code I write
  }
}

const counter = new Counter();
// Call increment method.
counter.incrementBy(1);
`.trim()}
      </CodeBlock>
      <h2>Objective-C classes allow sending messages</h2>
      <CodeBlock language="objc" smaller>
        {`
// Send increment message.
[counter incrementBy:@1];

// Here is the identifier for this message.
SEL messageIdentifier = @selector(incrementBy:);

// Send increment message.
[counter performSelector:@selector(incrementBy:) withObject:@1];

// Create message ready to send.
// Yes, it is a fair amount of code…
NSMethodSignature *signature = [Counter
  instanceMethodSignatureForSelector:@selector(incrementBy:)];
NSInvocation *sender = [NSInvocation
  invocationWithMethodSignature:signature];
NSNumber *amount = @1;
[sender setArgument:&amount atIndex:2];
[sender setTarget:counter];

// Now, let’s send the increment message twice.
[sender invoke];
[sender invoke];
`.trim()}
      </CodeBlock>
    </>
  );
}

export default function MessagePrimitivesPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Methods vs Messages</h1>
      <MessagePrimitivesCode />

      {/* <hr data-y="100vh" /> */}
    </main>
  );
}
