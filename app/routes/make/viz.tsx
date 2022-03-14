import { MetaFunction, LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { CodeBlock } from "../../view/code";
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
  
}

export default function MakeViz() {
  const data: Await<ReturnType<typeof loader>> = useLoaderData();

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
