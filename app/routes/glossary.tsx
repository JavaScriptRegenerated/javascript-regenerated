import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Glossary: JavaScript Regenerated",
    description: "The fundamental pieces of generator functions",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return {};
};

export default function GlossaryPage() {
  return (
    <main data-measure="center">
      <h2>Glossary</h2>
      <pre>
        <code className="lang-javascript">{`
function* GenerateSomething() {
  // Send a message
  yield "abc";

  // A message can be a primitive: string, number, regex, symbol
  yield "abc";
  yield 42;
  yield /[a-z]+/;
  yield Symbol.for("identifier");

  // A message can be a collection: array, set, map, object
  yield ["abc", "def"];

  // A message can be another generator function
  yield OtherGenerator;
  
  // Receive a message reply
  const reply = yield "abc";

  // Return a final message
  return "final message";
}
        `.trim()}</code>
      </pre>
    </main>
  );
}
