import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Generator Functions vs Classes: JavaScript Regenerated",
  };
};

const points = `
Classes call methods on \`this\`, which may return a result. Methods know the receiver is the current class or a subclass.
Generator functions \`yield\` messages to a receiver, which may send back a response. Generators do not know who the receiver is.
A \`yield\` does not perform the action, but pass it off to something else which does. 
Generator functions separate the receiver from the sender. Generator functions think in terms of messages to be made, sent, and received, rather than methods to be called.
`.trim().split('\n');

export default function GeneratorFunctionsVsClasses() {
  return (
    <>
      <h2>Generator Functions vs Classes</h2>
      {points.map(point => <p>{point}</p>)}
    </>
  );
}
