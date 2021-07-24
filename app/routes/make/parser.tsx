import React from "react";
import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { parseString } from "../../model/parsing";
import { NamedSection } from "../../view/semantics";
import { CodeBlock } from "../../view/code";
import { X } from "../../view/structure";

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

interface AWSRegion {
  primary: string;
  secondary: string;
  digit: number;
}
// https://docs.aws.amazon.com/directoryservice/latest/admin-guide/regions.html
function* ParseAWSRegion(): Generator<
  string | string[] | number[],
  AWSRegion,
  any
> {
  const primary = yield [
    "us-gov",
    "us",
    "af",
    "ap",
    "ca",
    "eu",
    "cn",
    "me",
    "sa",
  ];
  yield "-";
  const secondary = yield [
    "northeast",
    "northwest",
    "southeast",
    "central",
    "north",
    "east",
    "west",
    "south",
  ];
  yield "-";
  const digit = yield [1, 2, 3];

  return {
    primary,
    secondary,
    digit,
  };
}

function AWSRegionSection(): JSX.Element {
  function renderExample(input: string): JSX.Element {
    return (
      <div {...X(2)}>
        <div>
          <CodeBlock language="javascript">
            {`parseString(\n  "${input}",\n  ParseAWSRegion\n)`}
          </CodeBlock>
        </div>
        <div>
          <CodeBlock language="json">
            {JSON.stringify(parseString(input, ParseAWSRegion), null, 2)}
          </CodeBlock>
        </div>
      </div>
    );
  }

  return (
    <NamedSection id="aws-region-parser" heading={<h2>AWS Region Parser</h2>}>
      <CodeBlock language="javascript">{ParseAWSRegion.toString()}</CodeBlock>

      <h3>Results</h3>
      {renderExample("us-west-1")}
      {renderExample("ap-southeast-2")}
      {renderExample("xx-east-1")}
      {renderExample("eu-west-3")}
      {renderExample("us-gov-west-1")}
    </NamedSection>
  );
}

export default function MakeRenderer() {
  return (
    <main data-measure="center">
      <h1>Parser</h1>
      <CodeBlock language="javascript">{parseString.toString()}</CodeBlock>

      <AWSRegionSection />
    </main>
  );
}
