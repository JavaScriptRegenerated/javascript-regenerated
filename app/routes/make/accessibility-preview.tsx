import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import {
    Disabled,
  Textbox,
  previewJAWS,
  previewVoiceOver,
  processHTML,
} from "../../model/accessibilityPreview";
import { Await } from "../../types/helpers";
import { CodeBlock } from "../../view/code";
import { formatJavaScript } from "../../view/codeFormatting";
import { NamedSection } from "../../view/semantics";

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
  yield Textbox("First name");
  yield Textbox("Last name", [Disabled]);
}

export async function loader(args: Parameters<LoaderFunction>[0]) {
  return {
    functionsSource: {
      HTMLComponent: formatJavaScript(HTMLComponent.toString()),
      previewJAWS: formatJavaScript(previewJAWS.toString()),
      previewVoiceOver: formatJavaScript(previewVoiceOver.toString()),
    },
  };
}

export default function MakeRenderer() {
  const data: Await<ReturnType<typeof loader>> = useRouteData();

  const outputHTML = Array.from(processHTML(HTMLComponent)).join("");
  const outputJAWS = Array.from(previewJAWS(HTMLComponent)).join("\n");
  const outputVoiceOver = Array.from(previewVoiceOver(HTMLComponent)).join("\n");

  return (
    <main data-measure="center">
      <h1>{"Accessibility Tools Preview"}</h1>

      <NamedSection id="example-1" heading={<h2>Form Component</h2>}>
        <CodeBlock language="javascript">
          {data.functionsSource.HTMLComponent}
        </CodeBlock>
        <CodeBlock language="html">{outputHTML}</CodeBlock>
        <output style={{ border: "1px solid black", padding: "1rem" }}>
          <div dangerouslySetInnerHTML={{ __html: outputHTML }}></div>
        </output>
        <h3>JAWS</h3>
        <pre>{outputJAWS}</pre>
        <h3>VoiceOver</h3>
        <pre>{outputVoiceOver}</pre>
      </NamedSection>

      <NamedSection id="jaws-processor" heading={<h2>JAWS Processor</h2>}>
        <CodeBlock language="javascript">{data.functionsSource.previewJAWS.toString()}</CodeBlock>
      </NamedSection>
      <NamedSection id="voiceover-processor" heading={<h2>VoiceOver Processor</h2>}>
        <CodeBlock language="javascript">{data.functionsSource.previewVoiceOver.toString()}</CodeBlock>
      </NamedSection>
    </main>
  );
}
