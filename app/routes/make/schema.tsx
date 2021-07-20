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

export const out = {
  string: (name: string) => ({
    type: identifiers.string,
    name,
  }),
  number: (name: string) => ({
    type: identifiers.number,
    name,
  }),
};

type SchemaMessage = ReturnType<typeof out.string | typeof out.number>;
type SchemaReply = string | number;
type SchemaGenerator<Result> = Generator<SchemaMessage, Result, any>;

export function parseSchema<Result>(
  source: Record<string, any>,
  generator: () => SchemaGenerator<Result>
) {
  const gen = generator();
  let value: SchemaReply | undefined;

  while (true) {
    const result = gen.next(value ?? "");
    if (result.done) {
      return result.value;
    }

    value = undefined;

    if (result.value.type === identifiers.string) {
      if (typeof source[result.value.name] === "string") {
        value = source[result.value.name];
      }
    } else if (result.value.type === identifiers.number) {
      if (typeof source[result.value.name] === "number") {
        value = source[result.value.name];
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
  const primary = yield out.string("primary");
  const secondary = yield out.string("secondary");
  const digit = yield out.number("digit");

  return {
    primary,
    secondary,
    digit,
  };
}

export default function MakeRenderer() {
  function renderExample(input: any): JSX.Element {
    const result = parseSchema(input, AWSRegionSchema);
    console.log({ result });

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
