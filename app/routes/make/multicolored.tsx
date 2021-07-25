import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { countByteSize } from "../../model/bytes";
import {
  HTML,
  CSS,
  Link,
  processHTML,
  processCSS,
  allLinks,
} from "../../model/rendering";
import { Await } from "../../types/helpers";
import { CodeBlock } from "../../view/code";
import { formatJavaScript } from "../../view/codeFormatting";
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
  yield HTML`<nav>`;
  yield Link("/", "Home");
  yield Link("/about", "About us");
  yield Link("/terms", "Terms");
  yield HTML`</nav>`;

  yield CSS("p", "color: red;");
  yield CSS("p:after", "color: blue; content: ' and this is CSS';");
}

export async function loader(args: Parameters<LoaderFunction>[0]) {
  return {
    functionsSource: {
      Example: formatJavaScript(Example.toString()),
      validateLinks: formatJavaScript(validateLinks.toString()).replace(/links\d+/g, 'links'),
    },
  };
}

function validateLinks(links: Iterable<string>): Set<string> {
  const validLinks = new Set([
    "/", "/about", "/hiring", "/privacy"
  ]);
  const invalidLinks = new Set<string>();
  for (const link of links) {
    if (validLinks.has(link)) continue;
    invalidLinks.add(link);
  }
  return invalidLinks;
}

export default function MulticoloredComponentsPage() {
  let data: Await<ReturnType<typeof loader>> = useRouteData();

  const toString = (iteratable: Iterable<string>) =>
    Array.from(iteratable).join("");
  const htmlOutput = toString(processHTML(Example));
  const cssOutput = toString(processCSS(Example));
  const links = Array.from(allLinks(Example));
  const invalidLinks = Array.from(validateLinks(links));

  return (
    <main data-measure="center">
      <h1>Multicolored component</h1>
      <h2>Component</h2>
      <CodeBlock language="javascript" smaller>
        {data.functionsSource.Example}
      </CodeBlock>
      <CodeBlock language="javascript" smaller>
        {`
const htmlOutput = processHTML(Example);
const cssOutput = processCSS(Example);
const links = Array.from(allLinks(Example));
const invalidLinks = Array.from(validateLinks(links));
`.trim()}
      </CodeBlock>
      <h2>Output</h2>
      <NamedSection
        id="generated-html"
        heading={<h3>Generated HTML</h3>}
      >
        <CodeBlock language="html">{htmlOutput}</CodeBlock>
        <p>HTML: {countByteSize(htmlOutput)} bytes</p>
      </NamedSection>
      <NamedSection id="generated-css" heading={<h3>Generated CSS</h3>}>
        <CodeBlock language="css">{cssOutput}</CodeBlock>
        <p>CSS: {countByteSize(cssOutput)} bytes</p>
      </NamedSection>
      <NamedSection
        id="generated-links"
        heading={<h3>Generated Links</h3>}
      >
        <CodeBlock language="json">{JSON.stringify(links, null, 2)}</CodeBlock>
      </NamedSection>
      <NamedSection id="invalid-links" heading={<h3>Invalid Links</h3>}>
        <CodeBlock language="javascript" smaller>
          {data.functionsSource.validateLinks}
        </CodeBlock>
        <CodeBlock language="json">{JSON.stringify(invalidLinks, null, 2)}</CodeBlock>
      </NamedSection>
      <NamedSection id="preview" heading={<h2>Output Preview</h2>}>
        <output
          className="X"
          style={{ border: "1px solid black", padding: "1rem" }}
        >
          <style dangerouslySetInnerHTML={{ __html: cssOutput }}></style>
          <div dangerouslySetInnerHTML={{ __html: htmlOutput }}></div>
        </output>
      </NamedSection>
      <hr data-y="100vh" />
      <CodeBlock language="javascript" smaller>
        {`
const toString = (iter) => Array.from(iter).join("");

const htmlOutput = toString(processHTML(Example));
const cssOutput = toString(processCSS(Example));
const links = Array.from(allLinks(Example));
`.trim()}
      </CodeBlock>
    </main>
  );
}
