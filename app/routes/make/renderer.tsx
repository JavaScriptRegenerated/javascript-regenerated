import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { html, processHTML } from "../../model/rendering";
import { Await } from "../../types/helpers";
import { CodeBlock } from "../../view/code";

export let meta: MetaFunction = () => {
  return {
    title: "Renderers: JavaScript Regenerated",
    description: "One components that renders to many targets",
  };
};

export let links: LinksFunction = () => {
  return [];
};

function* HTMLComponent() {
  yield html`<h1>Hello!</h1>`;
  yield html`<ul>`;
  yield html`<li>Some`;
  yield html`<li>list`;
  yield html`<li>items`;
  yield html`</ul>`;
}

export async function loader(args: Parameters<LoaderFunction>[0]) {
  return {
    functionsSource: {
      HTMLComponent: HTMLComponent.toString(),
    },
  };
}

export default function MakeRenderer() {
  let data: Await<ReturnType<typeof loader>> = useRouteData();

  return (
    <main data-measure="center">
      <h1>Renderers</h1>
      <CodeBlock language="javascript">{processHTML.toString()}</CodeBlock>

      <h2>HTML Component</h2>
      <CodeBlock language="javascript">{data.functionsSource.HTMLComponent}</CodeBlock>

    </main>
  );
}
