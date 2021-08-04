import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { X, Y } from "../../view/structure";
import { NamedSection } from "../../view/semantics";
import { CodeBlock } from "../../view/code";
import { useState } from "react";
import { useEffect } from "react";
import {
  parseFormData,
  parseJSON,
  read,
  SchemaGenerator,
} from "../../model/schemas";

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

function useFetch<Data>(source: URL): null | Data {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (source instanceof URL) {
      fetch(source.toString(), { signal })
        .then((res) => res.json())
        .then((data) => setData(data));
    }

    return () => controller.abort();
  }, [source.toString()]);

  return data;
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

interface SwapiPersonData {
  name: string;
  height: string;
  mass: string;
}
function* SwapiPersonSchema(): SchemaGenerator<SwapiPersonData> {
  const name: string = yield read.string("name");
  const height: string = yield read.string("height");
  const mass: string = yield read.string("mass");

  return {
    name,
    height,
    mass,
  };
}
function* SwapiPersonResource(): SchemaGenerator<SwapiPersonData> {
  const name: string = yield read.string("name");
  const height: string = yield read.string("height");
  const mass: string = yield read.string("mass");

  return {
    name,
    height,
    mass,
  };
}

export default function MakeRenderer() {
  function renderExample(input: any): JSX.Element {
    const result = parseJSON(input, AWSRegionSchema);

    return (
      <div {...X(2)}>
        <div>
          <CodeBlock language="json">
            {JSON.stringify(result, null, 2)}
          </CodeBlock>
        </div>
      </div>
    );
  }

  const [profileData, setProfileData] = useState<ProfileData>({
    bio: "",
    favoriteNumber: 7,
  });

  const personDataRaw: any = useFetch(new URL(`https://swapi.py4e.com/api/people/1`));
  const personData = personDataRaw != null ? parseJSON(personDataRaw, SwapiPersonSchema) : null;
  // const personData = personDataRaw;

  return (
    <main data-measure="center">
      <h1>Schema</h1>

      <h2>JSON</h2>
      <CodeBlock language="javascript">{parseJSON.toString()}</CodeBlock>

      <h2>Form Data</h2>
      <CodeBlock language="javascript">{parseFormData.toString()}</CodeBlock>

      <NamedSection id="aws-region-schema" heading={<h2>AWS Region Schema</h2>}>
        <CodeBlock language="javascript">
          {AWSRegionSchema.toString()}
        </CodeBlock>

        <h3>Results</h3>
        {renderExample({ primary: "us", secondary: "east", digit: 1 })}
      </NamedSection>

      <NamedSection id="profile-form" heading={<h2>Profile Form</h2>}>
        <CodeBlock language="javascript">{ProfileSchema.toString()}</CodeBlock>

        <h3>Interactive Preview</h3>
        <form
          {...Y(1)}
          onChange={(event) => {
            setProfileData(
              parseFormData(new FormData(event.currentTarget), ProfileSchema)
            );
          }}
        >
          <label>
            <div>Bio:</div>
            <textarea
              name="bio"
              rows={5}
              defaultValue={profileData.bio}
            ></textarea>
          </label>
          <label>
            <div>Favorite number:</div>
            <input
              name="favoriteNumber"
              type="number"
              defaultValue={profileData.favoriteNumber}
            />
          </label>
        </form>
        <CodeBlock language="json">
          {JSON.stringify(profileData, null, 2)}
        </CodeBlock>
      </NamedSection>

      <NamedSection id="fetched-data" heading={<h2>Fetched Data</h2>}>
        <h3>Results</h3>
        <CodeBlock language="json">
          {JSON.stringify(personData, null, 2)}
        </CodeBlock>
      </NamedSection>
    </main>
  );
}
