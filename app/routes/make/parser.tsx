import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { parseString } from "../../model/parsing";

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
}
function* ParseAWSRegion(): Generator<string, AWSRegion, string> {
  const primary = yield 'us';
  yield '-';
  yield 'east';
  yield '-';
  yield '1';

  return {
    primary,
    secondary: '',
  };
}

export default function MakeRenderer() {
  let data = useRouteData();

  const awsRegionResult = parseString('us-east-1', ParseAWSRegion);
  console.log({ awsRegionResult });

  return (
    <main data-measure="center">
      <h1>Parser</h1>
      <pre>
        <code className="lang-javascript">{parseString.toString()}</code>
      </pre>

      <h2>AWS Region Parser</h2>
      <pre>
        <code className="lang-javascript">{ParseAWSRegion.toString()}</code>
      </pre>

      <h3>Result</h3>
      <pre>
        <code className="lang-json">{JSON.stringify(awsRegionResult, null, 2)}</code>
      </pre>
    </main>
  );
}
