import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { processHTML, processCSS } from "../../model/rendering";

export let meta: MetaFunction = () => {
  return {
    title: "Renderers: JavaScript Regenerated",
    description: "One components that renders to many targets",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return { message: "this is awesome 😎" };
};

export default function MakeRenderer() {
  let data = useRouteData();

  return (
    <main data-measure="center">
      <h1>Renderers</h1>
      <h2>HTML</h2>
      <pre>
        <code className="lang-javascript">{processHTML.toString()}</code>
      </pre>

      <h2>CSS</h2>
      <pre>
        <code className="lang-javascript">{processCSS.toString()}</code>
      </pre>
      <p>Message from the loader: {data.message}</p>
    </main>
  );
}
