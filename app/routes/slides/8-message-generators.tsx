import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Message Generators: JavaScript Regenerated",
  };
};

const points = `
- Works in all modern browsers & Node.js
- Functional programming allows JavaScript that is easier to reason about and easier to test. Generator functions are enhanced pure functions.
- Generator functions separate the receiver from the sender. Generator functions think in terms of messages to be made, sent, and received, rather than methods to be called.
`.trim().split('\n');

export default function GeneratorFunctions() {
  return (
    <>
      <h2>Generator Functions</h2>
      {points.map(point => <p>{point}</p>)}
    </>
  );
}
