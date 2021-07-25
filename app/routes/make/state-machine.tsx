import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { X, Y } from "../../view/structure";
import { NamedSection } from "../../view/semantics";
import { CodeBlock } from "../../view/code";
import { useState } from "react";
import { useEffect } from "react";
import {
  parseFormData,
  parseSchema,
  read,
  SchemaGenerator,
} from "../../model/schemas";

export let meta: MetaFunction = () => {
  return {
    title: "State Machine: JavaScript Regenerated",
    description: "Define and run state machines using generator functions",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return {};
};

export default function MakeStateMachine() {
  return (
    <main data-measure="center">
      <h1>State Machine</h1>

      <h2>State machine components</h2>
      <CodeBlock language="javascript">{`
import { entry, on, start } from "yieldmachine";

// This machine will load the passed URL.
function FetchMachine(url) {
  function fetchData() {
    return fetch(url);
  }
  
  function* idle() {
    yield on("FETCH", loading);
  }
  function* loading() {
    yield entry(fetchData);
    yield on("SUCCESS", success);
    yield on("FAILURE", failure);
  }
  function* success() {}
  function* failure() {
    yield on("RETRY", loading);
  }

  return idle;
}

// This machine will load our API.
function ExampleAPILoader() {
  const exampleURL = new URL("https://api.example.org/…");
  return FetchMachine(exampleURL);
}

// Start our API loader machine.
const loader = start(ExampleAPILoader);
loader.current; // "idle"

// Send the FETCH message to start loading.
loader.next("FETCH");
loader.current; // "loading"

loader.results.then((results) => {
  // Use response of fetch()
  console.log("Fetched", results.fetchData);
  loader.current; // "success"
});
`}</CodeBlock>
    </main>
  );
}
