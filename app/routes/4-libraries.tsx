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
          <li><a href="https://github.com/RoyalIcing/yieldparser" style={{ color: "#F59E0B" }}>RoyalIcing/yieldparser:</a> Parse strings using composable components.</li>
          <li><a href="https://github.com/RoyalIcing/yieldmarkup" style={{ color: "#A78BFA" }}>RoyalIcing/yieldmarkup:</a> Async HTML components.</li>
          <li><a href="https://github.com/RoyalIcing/yieldmachine" style={{ color: "#10B981" }}>RoyalIcing/yieldmachine:</a> Define state machines with generator functions.</li>
          <li><a href="https://github.com/RoyalIcing/yieldpattern" style={{ color: "#EC4899" }}>RoyalIcing/yieldpattern:</a> Pattern matching in vanilla JavaScript with generator functions.</li>
        </ul>
      </nav>

      <hr data-y="100vh" />

      <h2>{'Learn More!'}</h2>
      <nav data-text="1">
        <p data-p="b1" data-text="italic">I write about generator functions, accessibility, modern web technologies, and design.</p>
        <ul {...Y(1)}>
          <li><a href="https://regenerated.dev/" data-text="bold" style={{ color: "#EF4444" }}>Regenerated.Dev</a> focuses specifically on patterns for generator functions.</li>
          <li><a href="https://components.guide/" data-text="bold" style={{ color: "#60A5FA" }}>Components.Guide</a> explores accessibility, React, and modern web standards.</li>
        </ul>
      </nav>
    </main>
  );
}
