import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { countByteSize } from "../../model/bytes";
import {
  HTML,
  CSS,
  Link,
  processRichHTML,
  processCSS,
  allLinks,
  RemoteImage,
  allLoadedOrigins,
  processMetaLinkHTML,
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
  yield HTML`<nav>`;
  yield Link("/", "Home");
  yield Link("/about", "About us");
  yield Link("/terms", "Terms");
  yield HTML`</nav>`;
  yield HTML`<p>This is HTML</p>`;
  yield RemoteImage(
    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    "dog playing at the seaside"
  );
  yield RemoteImage(
    "https://i.imgur.com/GleAY3fl.jpg",
    "a tiger cub and its parent"
  );

  yield CSS("p", "color: red;");
  yield CSS("p:after", "color: deepskyblue; content: ' and this is CSS';");
}

export async function loader(args: Parameters<LoaderFunction>[0]) {
  return {
    functionsSource: {
      Example: formatJavaScript(Example.toString()),
      validateLinks: formatJavaScript(validateLinks.toString()).replace(
        /links\d+/g,
        "links"
      ),
      allLoadedOrigins: formatJavaScript(allLoadedOrigins.toString()),
      processMetaLinkHTML: formatJavaScript(processMetaLinkHTML.toString()),
    },
  };
}

function validateLinks(links: Iterable<string>): Set<string> {
  const knowLinks = new Set([
    "/",
    "/about",
    "/hiring",
    "/privacy",
    "/blog",
    "/features",
  ]);
  const invalidLinks = new Set<string>();
  for (const link of links) {
    if (knowLinks.has(link)) continue;
    invalidLinks.add(link);
  }
  return invalidLinks;
}

export default function MulticoloredComponentsPage() {
  let data: Await<ReturnType<typeof loader>> = useLoaderData();

  const toString = (iteratable: Iterable<string>) =>
    Array.from(iteratable).join("");
  const htmlOutput = toString(processRichHTML(Example));
  const cssOutput = toString(processCSS(Example));
  const links = Array.from(allLinks(Example));
  const invalidLinks = Array.from(validateLinks(links));
  const origins = Array.from(allLoadedOrigins(Example));
  const metaLinkHTML = toString(
    processRichHTML(() => processMetaLinkHTML(Example))
  );

  return (
    <main data-measure="center">
      <h1>Multicolored component</h1>
      <h2>Component</h2>
      <CodeBlock language="javascript" smaller>
        {data.functionsSource.Example}
      </CodeBlock>
      <NamedSection id="preview" heading={<h2>Output Preview</h2>}>
        <output
          className="X"
          style={{ border: "1px solid black", padding: "1rem" }}
        >
          <style dangerouslySetInnerHTML={{ __html: cssOutput }}></style>
          <div dangerouslySetInnerHTML={{ __html: htmlOutput }}></div>
        </output>
      </NamedSection>
      <h2>Output</h2>
      <CodeBlock language="javascript" smaller>
        {`
const htmlOutput = processRichHTML(Example);
const cssOutput = processCSS(Example);
const links = Array.from(allLinks(Example));
const invalidLinks = Array.from(validateLinks(links));
`.trim()}
      </CodeBlock>
      <NamedSection id="generated-html" heading={<h3>HTML Output</h3>}>
        <CodeBlock language="html" smaller>
          {htmlOutput}
        </CodeBlock>
        <p>HTML: {countByteSize(htmlOutput)} bytes</p>
      </NamedSection>
      <NamedSection id="generated-css" heading={<h3>CSS Output</h3>}>
        <CodeBlock language="css" smaller>
          {cssOutput}
        </CodeBlock>
        <p>CSS: {countByteSize(cssOutput)} bytes</p>
      </NamedSection>
      <NamedSection id="generated-links" heading={<h3>All Links</h3>}>
        <CodeBlock language="json">{JSON.stringify(links, null, 2)}</CodeBlock>
      </NamedSection>
      <NamedSection id="invalid-links" heading={<h3>Invalid Links</h3>}>
        <CodeBlock language="javascript" smaller>
          {data.functionsSource.validateLinks}
        </CodeBlock>
        <CodeBlock language="json">
          {JSON.stringify(invalidLinks, null, 2)}
        </CodeBlock>
      </NamedSection>

      <hr data-y="100vh" />

      <NamedSection id="meta-links-html" heading={<h3>Meta Links HTML</h3>}>
        <CodeBlock language="javascript" smaller>
          {data.functionsSource.allLoadedOrigins}
        </CodeBlock>
        <CodeBlock language="javascript" smaller>
          {data.functionsSource.processMetaLinkHTML}
        </CodeBlock>
        <CodeBlock language="json">
          {JSON.stringify(origins, null, 2)}
        </CodeBlock>
        <CodeBlock language="html">{metaLinkHTML}</CodeBlock>
      </NamedSection>

      <hr data-y="100vh" />

      <CodeBlock language="javascript" smaller>
        {`
const toString = (iter) => Array.from(iter).join("");

const htmlOutput = toString(processRichHTML(Example));
const cssOutput = toString(processCSS(Example));
const links = Array.from(allLinks(Example));
`.trim()}
      </CodeBlock>
    </main>
  );
}
