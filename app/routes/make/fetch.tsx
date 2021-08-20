import { useState } from "react";
import { fetchJSONComponent, getJSON } from "../../model/fetching";
import { parseFormData, parseJSON, read } from "../../model/schemas";
import { useAsyncFunc } from "../../view/async";
import { CodeBlock } from "../../view/code";
import { NamedSection } from "../../view/semantics";

function* BundlePhobiaAPI(packageName: string) {
  const url = new URL("https://bundlephobia.com/api/size");
  url.searchParams.set("package", packageName);
  const rawData: unknown = yield getJSON(url);

  const parsedData = parseJSON(rawData, function* Schema() {
    const name: string = yield read.string("name");
    const description: string = yield read.string("description");
    const size: number = yield read.number("size");
    const sizeGzipped: number = yield read.number("gzip");
    const hasSideEffects: boolean = yield read.boolean("hasSideEffects");

    return {
      name,
      description,
      size,
      sizeGzipped,
      hasSideEffects,
    };
  });

  return parsedData;
}

function* BundlePhobiaFormSchema() {
  const packageName: string = yield read.string("packageName");

  return {
    packageName,
  };
}

export default function MakeFetchHappen() {
  const [packageName, updatePackageName] = useState("react");

  const bundlephobiaData = useAsyncFunc(
    (signal) =>
      fetchJSONComponent(BundlePhobiaAPI.bind(null, packageName), { signal }),
    [packageName]
  );

  return (
    <main data-measure="center">
      <h1>Fetch</h1>

      <NamedSection id="bundlephobia" heading={<h2>Bundlephobia</h2>}>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={(event) => {
            event.preventDefault();
            const data = parseFormData(
              new FormData(event.currentTarget),
              BundlePhobiaFormSchema
            );
            updatePackageName(data.packageName);
          }}
        >
          <label>
            <div>Package name:</div>
            <input type="text" name="packageName" defaultValue={packageName} />
          </label>
        </form>

        <h3>{packageName}</h3>

        {bundlephobiaData == null ? (
          <div>Loading…</div>
        ) : (
          <CodeBlock language="json">
            {JSON.stringify(bundlephobiaData, null, 2)}
          </CodeBlock>
        )}
      </NamedSection>
    </main>
  );
}
