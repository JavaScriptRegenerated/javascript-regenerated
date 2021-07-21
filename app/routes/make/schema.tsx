import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { X } from "../../view/structure";

export let meta: MetaFunction = () => {
  return {
    title: "Schema: JavaScript Regenerated",
    description: "Validate nested data using generator functions",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return {};
};

export const identifiers = {
  string: "string",
  number: "number",
} as const;

export const read = {
  string: (name: string) => ({
    type: identifiers.string,
    name,
  }),
  number: (name: string) => ({
    type: identifiers.number,
    name,
  }),
};

type SchemaMessage = ReturnType<typeof read.string | typeof read.number>;
type SchemaReply = string | number;
type SchemaGenerator<Result> = Generator<SchemaMessage, Result, any>;

export function parseSchema<Result>(
  source: Record<string, any>,
  generator: () => SchemaGenerator<Result>
) {
  const gen = generator();
  let reply: SchemaReply | undefined;

  while (true) {
    const result = gen.next(reply ?? "");
    if (result.done) {
      return result.value;
    }

    reply = undefined;

    if (result.value.type === identifiers.string) {
      if (typeof source[result.value.name] === "string") {
        reply = source[result.value.name];
      }
    } else if (result.value.type === identifiers.number) {
      if (typeof source[result.value.name] === "number") {
        reply = source[result.value.name];
      }
    }
  }
}

interface AWSRegion {
  primary: string;
  secondary: string;
  digit: number;
}
function* AWSRegionSchema(): SchemaGenerator<AWSRegion> {
  const primary = yield read.string("primary");
  const secondary = yield read.string("secondary");
  const digit = yield read.number("digit");

  return {
    primary,
    secondary,
    digit,
  };
}

export default function MakeRenderer() {
  function renderExample(input: any): JSX.Element {
    const result = parseSchema(input, AWSRegionSchema);

    return (
      <div {...X(2)}>
        <div>
          <pre>
            <code className="lang-json">
              {JSON.stringify(result, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <main data-measure="center">
      <h1>Schema</h1>
      <pre>
        <code className="lang-javascript">{parseSchema.toString()}</code>
      </pre>

      <h2>AWS Region Schema</h2>
      <pre>
        <code className="lang-javascript">{AWSRegionSchema.toString()}</code>
      </pre>

      <h3>Results</h3>
      {renderExample({ primary: "us", secondary: "east", digit: 1 })}
    </main>
  );
}
