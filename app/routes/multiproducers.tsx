import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { out, processHTML, processCSS } from "../model/rendering";
import { Await } from "../types/helpers";
import { CodeBlock } from "../view/code";
import { NamedSection } from "../view/semantics";

export let meta: MetaFunction = () => {
  return {
    title: "Multiprocessors: JavaScript Regenerated",
    description: "One components that renders to many targets",
  };
};

export let links: LinksFunction = () => {
  return [];
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

export async function loader(args: Parameters<LoaderFunction>[0]) {
  return {
    functionsSource: {
      Example: Example.toString(),
    },
  };
}

export default function MultiProducers() {
  let data: Await<ReturnType<typeof loader>> = useRouteData();

  const html = Array.from(processHTML(Example)).join("");
  const css = Array.from(processCSS(Example)).join("");

  return (
    <main data-measure="center">
      <h1>Multi Producers</h1>
      <h2>Input</h2>
      <pre>
        <code
          className="lang-javascript"
          contentEditable
          style={{ display: "block" }}
          onInput={({ target }) => {
            if (target instanceof HTMLElement) {
              (window as any).Prism.highlightElement(target);
            }
          }}
        >
          {data.functionsSource.Example}
        </code>
      </pre>
      <h2>Generated code</h2>
      <NamedSection
        id="generated-html-heading"
        heading={<h3>Generated HTML</h3>}
      >
        <CodeBlock language="html">{html}</CodeBlock>
        <p>HTML: {countByteSize(html)} bytes</p>
      </NamedSection>
      <NamedSection id="generated-css-heading" heading={<h3>Generated CSS</h3>}>
        <CodeBlock language="css">{css}</CodeBlock>
        <p>CSS: {countByteSize(css)} bytes</p>
      </NamedSection>
      <NamedSection id="preview-heading" heading={<h2>Output Preview</h2>}>
        <output
          className="X"
          style={{ border: "1px solid black", padding: "1rem" }}
        >
          <blockquote>
            <style dangerouslySetInnerHTML={{ __html: css }}></style>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </blockquote>
        </output>
      </NamedSection>
      <p>Message from the loader: {data.message}</p>
    </main>
  );
}
