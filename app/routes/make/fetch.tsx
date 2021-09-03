import { useState } from "react";
import {
  deleteJSON,
  fetchComponent,
  getJSON,
  postJSON,
} from "../../model/fetching";
import { parseFormData, parseJSON, read } from "../../model/schemas";
import { useAsyncAction, useAsyncFunc } from "../../view/async";
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

const publicStoreURL = new URL("https://public-store.collected.workers.dev");
function* PublicStoreListItems() {
  const rawData: unknown = yield getJSON(new URL("/items", publicStoreURL));

  return parseJSON(rawData, function* Schema() {
    const result: string[] = yield read.array("result", "string");
    return result;
  });
}
function* PublicStoreCreateItem() {
  const rawData: unknown = yield postJSON(new URL("/items", publicStoreURL));

  return parseJSON(rawData, function* Schema() {
    const result: number = yield read.number("result");
    return result;
  });
}
function* PublicStoreDeleteItems() {
  yield deleteJSON(new URL("/items", publicStoreURL));
}

export default function MakeFetchHappen() {
  const [packageName, updatePackageName] = useState("react");

  const [bundlephobiaData] = useAsyncFunc(
    (signal) =>
      fetchComponent(BundlePhobiaAPI.bind(null, packageName), { signal }),
    [packageName]
  );

  const [performCreate, createResult] = useAsyncAction((signal) =>
    fetchComponent(PublicStoreCreateItem, { signal })
  );
  const [performDelete, deleteResult] = useAsyncAction((signal) =>
    fetchComponent(PublicStoreDeleteItems, { signal })
  );
  console.log(createResult);

  const [listData] = useAsyncFunc(
    (signal) => fetchComponent(PublicStoreListItems, { signal }),
    [createResult.completedCount, deleteResult.completedCount]
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

      <NamedSection id="list" heading={<h2>List</h2>}>
        <button type="button" onClick={performCreate}>
          Add Random Item
        </button>
        <button type="button" onClick={performDelete}>
          Delete All Items
        </button>
        {listData == null ? (
          <div data-p="1">Loading…</div>
        ) : (
          <CodeBlock language="json">
            {JSON.stringify(listData, null, 2)}
          </CodeBlock>
        )}
      </NamedSection>
    </main>
  );
}
