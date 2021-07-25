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
      <nav data-text="1">
        <ul {...Y(1)}>
          <li><a href="https://github.com/RoyalIcing/yieldparser">yieldparser:</a> Parser components</li>
          <li><a href="https://github.com/RoyalIcing/yieldmarkup">yieldmarkup:</a> Async HTML components</li>
          <li><a href="https://github.com/RoyalIcing/yieldmachine">yieldmachine:</a> Define state machines with generator functions</li>
          <li><a href="https://github.com/RoyalIcing/yieldpattern">yieldpattern:</a> Pattern matching in vanilla JavaScript with generator functions</li>
        </ul>
      </nav>

      <h2>{'Learn More'}</h2>
      <nav data-text="1">
        <p data-p="b1">I write about generator functions, accessibility, modern web technologies, and design.</p>
        <ul {...Y(1)}>
          <li><a href="https://regenerated.dev/">Regenerated.Dev</a> focuses specifically on patterns for generator functions</li>
          <li><a href="https://components.guide/">Components.Guide</a> explores accessibility, React, and modern web standards.</li>
        </ul>
      </nav>
    </main>
  );
}
