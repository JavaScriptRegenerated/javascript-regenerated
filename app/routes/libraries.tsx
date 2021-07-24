import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { CodeBlock } from "../view/code";

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
        <ul>
          <li><a href="https://github.com/RoyalIcing/yieldparser">yieldparser for parsing</a></li>
        </ul>
      </nav>
    </main>
  );
}
