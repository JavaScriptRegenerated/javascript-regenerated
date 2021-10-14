import "regenerator-runtime/runtime"; // Would love to get rid of this but yieldmachine currently builds for it.
import { MetaFunction, LinksFunction, LoaderFunction, useRouteData } from "remix";
import { X, Y } from "../../view/structure";
import { NamedSection } from "../../view/semantics";
import { CodeBlock } from "../../view/code";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { accumulate, compound, listenTo, on, start } from "yieldmachine";
import { formatJavaScript } from "../../view/codeFormatting";
import { Await } from "../../types/helpers";

export let meta: MetaFunction = () => {
  return {
    title: "State Machine: JavaScript Regenerated",
    description: "Define and run state machines using generator functions",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export async function loader(args: Parameters<LoaderFunction>[0]) {
  return {
    source: {
      machines: {
        EventSourceMachine: formatJavaScript(EventSourceMachine.toString()),
      },
      components: {},
      functions: {},
    },
  };
}

const messagesKey = Symbol("messages");

function* EventSourceMachine(eventTarget: EventTarget) {
  // yield on(new Map([["type", "error"], ["readyState", EventSource.CLOSED]]), Closed);
  yield listenTo(eventTarget, "error");
  yield on("error", compound(Closed));

  function* Open() {
    yield listenTo(eventTarget, "message");
    yield accumulate("message", messagesKey);
  }
  function* Closed() {}

  return function* Connecting() {
    yield listenTo(eventTarget, "open");
    yield on("open", Open);
  };
}

const publicStoreURL = new URL("https://public-store.collected.workers.dev");

function MakeStreamItems() {
  const [currentState, updateCurrentState] = useState("");
  const [changeCount, updateChangeCount] = useState(0);
  const [items, updateItems] = useState<Array<unknown>>(() => []);

  useEffect(() => {
    const eventSource = new EventSource(
      new URL("/items/event-stream", publicStoreURL).toString()
    );
    const machine = start(EventSourceMachine.bind(null, eventSource));

    machine.signal.addEventListener("StateChanged", () => {
      console.log("state changed", machine.current);
      updateCurrentState(machine.current as string);
      updateChangeCount(machine.changeCount);
    });
    machine.signal.addEventListener("AccumulationsChanged", () => {
      console.log("accumulations changed", machine.accumulations);
      updateItems(machine.accumulations.get(messagesKey) ?? []);
    });
  }, []);

  return (
    <>
      <output>
        {currentState} ({changeCount})
      </output>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{JSON.stringify(item.data)}</li>
        ))}
      </ul>
    </>
  );
}

export default function MakeStateMachine() {
  const data: Await<ReturnType<typeof loader>> = useRouteData();

  return (
    <main data-measure="center">
      <h1>State Machine</h1>

      <MakeStreamItems />
      <CodeBlock language="javascript">
        {data.source.machines.EventSourceMachine}
      </CodeBlock>

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
