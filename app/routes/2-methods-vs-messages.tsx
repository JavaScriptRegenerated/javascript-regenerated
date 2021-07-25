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

const simpleIcons = [] as const;
const heroIcons = [] as const;

export let loader: LoaderFunction = async () => {
  return {
    icons: {
      ...(await loadSimpleIcons(simpleIcons)),
      ...(await loadHeroIcons(heroIcons)),
    },
  };
};

function MethodsVsPrimitivesCode() {
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

export default function MethodsVsPrimitivesPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Methods vs Messages</h1>
      <MethodsVsPrimitivesCode />
    </main>
  );
}
