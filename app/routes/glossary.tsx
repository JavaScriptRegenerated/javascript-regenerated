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
  return { message: "this is awesome 😎" };
};

export default function Index() {
  let data = useRouteData();

  return (
    <main data-measure="center">
      <h2>Glossary</h2>
      <dl>
        <dt>Send a message</dt>
        <dd>`yield "abc";`</dd>
        <dt>Receive a message reply</dt>
        <dd>`const reply = yield "abc";`</dd>
        <dt>Return a final message</dt>
        <dd>`return "final message";</dd>
        <dt>Message processor accepts certain messages to solve a problem</dt>
        <dt>A message can be a primitive: string, number, symbol</dt>
        <dd>`yield "abc";`</dd>
        <dd>`yield 42;`</dd>
        <dd>`yield Symbol.for("identifier");`</dd>
        <dt>A message can be a collection: array, set, map, object</dt>
        <dd>`yield ["abc", "def"];`</dd>
        <dt>A message can be another generator function</dt>
        <dd>`yield OtherGenerator;`</dd>
      </dl>
      <p>Message from the loader: {data.message}</p>
    </main>
  );
}
