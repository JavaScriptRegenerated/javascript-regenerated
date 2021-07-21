import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { X, Y } from "../../view/structure";
import { NamedSection } from "../../view/semantics";
import { useRef } from "react";
import { useState } from "react";

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
// type SchemaGenerator<Result> = Generator<ReturnType<typeof read.string>, Result, string> | Generator<ReturnType<typeof read.number>, Result, number>;
type SchemaGenerator<Result> = Generator<
  SchemaMessage,
  Result,
  SchemaReply | any
>;

export function parseSchema<Result>(
  source: Record<string, any>,
  generator: () => SchemaGenerator<Result>
) {
  const gen = generator();
  let reply: SchemaReply | undefined;

  while (true) {
    const result = gen.next(reply ?? ("" as any));
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

export function parseFormData<Result>(
  source: FormData,
  generator: () => SchemaGenerator<Result>
) {
  const gen = generator();
  let reply: SchemaReply | undefined;

  while (true) {
    const result = gen.next(reply ?? ("" as any));
    if (result.done) {
      return result.value;
    }

    reply = undefined;

    if (result.value.type === identifiers.string) {
      if (source.has(result.value.name)) {
        reply = source.get(result.value.name) as string;
      }
    } else if (result.value.type === identifiers.number) {
      if (source.has(result.value.name)) {
        reply = parseFloat(source.get(result.value.name) as string);
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
  const primary: string = yield read.string("primary");
  const secondary: string = yield read.string("secondary");
  const digit: number = yield read.number("digit");

  return {
    primary,
    secondary,
    digit,
  };
}

interface ProfileData {
  bio: string;
  favoriteNumber: number;
}
function* ProfileSchema(): SchemaGenerator<ProfileData> {
  const bio: string = yield read.string("bio");
  const favoriteNumber: number = yield read.number("favoriteNumber");

  return {
    bio,
    favoriteNumber,
  };
}

export default function MakeRenderer() {
  function renderExample(input: any): JSX.Element {
    const result = parseSchema(input, AWSRegionSchema);

    return (
      <div {...X(2)}>
        <div>
          <pre>
            <code className="lang-json">{JSON.stringify(result, null, 2)}</code>
          </pre>
        </div>
      </div>
    );
  }

  const [profileData, setProfileData] = useState<ProfileData>({
    bio: "",
    favoriteNumber: 7,
  });

  return (
    <main data-measure="center">
      <h1>Schema</h1>

      <h2>JSON</h2>
      <pre>
        <code className="lang-javascript">{parseSchema.toString()}</code>
      </pre>

      <h2>Form Data</h2>
      <pre>
        <code className="lang-javascript">{parseFormData.toString()}</code>
      </pre>

      <NamedSection id="aws-region-schema" heading={<h2>AWS Region Schema</h2>}>
        <pre>
          <code className="lang-javascript">{AWSRegionSchema.toString()}</code>
        </pre>

        <h3>Results</h3>
        {renderExample({ primary: "us", secondary: "east", digit: 1 })}
      </NamedSection>

      <NamedSection id="profile-form" heading={<h2>Profile Form</h2>}>
        <pre>
          <code className="lang-javascript">{ProfileSchema.toString()}</code>
        </pre>

        <h3>Interactive Preview</h3>
        <form {...Y(1)} onChange={(event) => {
          setProfileData(parseFormData(new FormData(event.currentTarget), ProfileSchema))
        }}>
          <label>
            <div>Bio:</div>
            <textarea name="bio" rows={5} defaultValue={profileData.bio}></textarea>
          </label>
          <label>
            <div>Favorite number:</div>
            <input name="favoriteNumber" type="number" defaultValue={profileData.favoriteNumber} />
          </label>
        </form>
        <pre>
          <code className="lang-json">
            {JSON.stringify(profileData, null, 2)}
          </code>
        </pre>
      </NamedSection>
    </main>
  );
}
