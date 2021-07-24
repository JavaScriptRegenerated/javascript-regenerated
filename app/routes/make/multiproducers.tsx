import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { countByteSize } from "../../model/bytes";
import { HTML, CSS, processHTML, processCSS } from "../../model/rendering";
import { Await } from "../../types/helpers";
import { CodeBlock } from "../../view/code";
import { NamedSection } from "../../view/semantics";

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
  yield HTML`<h1>Hello!</h1>`;
  yield HTML`<p>This is HTML</p>`;
  yield CSS("p", "color: red;");
  yield CSS("p:after", "color: blue; content: ' and this is CSS';");
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

  const htmlOutput = Array.from(processHTML(Example)).join("");
  const cssOutput = Array.from(processCSS(Example)).join("");

  return (
    <main data-measure="center">
      <h1>Multi Producers</h1>
      <h2>Component</h2>
      <CodeBlock language="javascript" smaller>
        {data.functionsSource.Example}
      </CodeBlock>
      <h2>Generated code</h2>
      <NamedSection
        id="generated-html-heading"
        heading={<h3>Generated HTML</h3>}
      >
        <CodeBlock language="html">{htmlOutput}</CodeBlock>
        <p>HTML: {countByteSize(htmlOutput)} bytes</p>
      </NamedSection>
      <NamedSection id="generated-css-heading" heading={<h3>Generated CSS</h3>}>
        <CodeBlock language="css">{cssOutput}</CodeBlock>
        <p>CSS: {countByteSize(cssOutput)} bytes</p>
      </NamedSection>
      <NamedSection id="preview-heading" heading={<h2>Output Preview</h2>}>
        <output
          className="X"
          style={{ border: "1px solid black", padding: "1rem" }}
        >
          <style dangerouslySetInnerHTML={{ __html: cssOutput }}></style>
          <div dangerouslySetInnerHTML={{ __html: htmlOutput }}></div>
        </output>
      </NamedSection>
    </main>
  );
}
