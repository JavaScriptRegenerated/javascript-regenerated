import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Y } from "../view/structure";

export let meta: MetaFunction = () => {
  return {
    title: "Open Source Libraries: JavaScript Regenerated",
    description: "Generator Component libraries you can install today",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return {};
};

export default function LibrariesPage() {
  return (
    <main data-measure="center">
      <h2>Open Source Libraries</h2>
      <nav>
        <ul {...Y(1)} data-text="1">
          <li><a href="https://github.com/RoyalIcing/yieldparser">yieldparser: Parser components</a></li>
          <li><a href="https://github.com/RoyalIcing/yieldmarkup">yieldmarkup: Async HTML components</a></li>
          <li><a href="https://github.com/RoyalIcing/yieldmachine">yieldmachine: Define state machines with generator functions</a></li>
          <li><a href="https://github.com/RoyalIcing/yieldpattern">yieldpattern: Pattern matching in vanilla JavaScript with generator functions</a></li>
        </ul>
      </nav>
    </main>
  );
}
