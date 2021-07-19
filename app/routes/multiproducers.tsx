import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { out, processHTML, processCSS } from "../model/rendering";

export let meta: MetaFunction = () => {
  return {
    title: "Multiprocessors: JavaScript Regenerated",
    description: "One components that renders to many targets",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return { message: "this is awesome 😎" };
};

function* Example() {
  yield out.html`<h1>Hello!</h1>`;
  yield out.html`<p>This is HTML</p>`;
  yield out.css("p", "color: red;");
  yield out.css("p:after", "color: blue; content: ' and this is CSS';");
}

function countByteSize(input: string): number {
  const encoder = new TextEncoder();
  const view = encoder.encode(input);
  return view.length;
}

export default function MultiProducers() {
  let data = useRouteData();

  const html = Array.from(processHTML(Example)).join("");
  const css = Array.from(processCSS(Example)).join("");

  return (
    <main data-measure="center">
      <h1>Multi Producers</h1>
      <h2>Input</h2>
      <pre>
        <code className="lang-javascript" contentEditable style={{ display: 'block' }} onInput={({ target }) => {
          if (target instanceof HTMLElement) {
            (window as any).Prism.highlightElement(target);
          }
        }}>
          {Example.toString()}
        </code>
      </pre>
      <h2>Generated code</h2>
      <section aria-labelledby="generated-html-heading">
        <h3 id="generated-html-heading">Generated HTML</h3>
        <pre>
          <code className="lang-html">{html}</code>
        </pre>
        <p>HTML: {countByteSize(html)} bytes</p>
      </section>
      <section aria-labelledby="generated-css-heading">
        <h3 id="generated-css-heading">Generated CSS</h3>
        <pre>
          <code className="lang-css">{css}</code>
        </pre>
        <p>CSS: {countByteSize(css)} bytes</p>
      </section>
      <section aria-labelledby="preview-heading">
        <h2 id="preview-heading">Output Preview</h2>
        <output className="X" style={{ border: "1px solid black" }}>
          <blockquote>
            <style dangerouslySetInnerHTML={{ __html: css }}></style>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </blockquote>
        </output>
      </section>
      <p>Message from the loader: {data.message}</p>
    </main>
  );
}
