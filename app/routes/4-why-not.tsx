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
      <h2>React popularised:</h2>
      <nav data-text="1">
        <ul {...Y(1)}>
          <li>
            <code>{"route = f(url)"}</code>
          </li>
        </ul>
      </nav>
      <h2>Why don’t we have?</h2>
      <nav data-text="1">
        <ul {...Y(1)}>
          <li>
            <code>{"route = f(url)"}</code>
          </li>
          <li>
            <code>{"apiData = f(route)"}</code>
          </li>
          <li>
            <code>{"apiRequest = f(form)"}</code>
          </li>
          <li>
            <code>{"sanitizedData = f(untrustedInput)"}</code>
          </li>
          <li>
            <code>{"state = f(events)"}</code>
          </li>
          <li>
            <code>{"cssVariables = f(tokens)"}</code>
          </li>
          <li>
            <code>{"cssRules = f(selector)"}</code>
          </li>
          <li>
            <code>{"localizedText = f(key, values)"}</code>
          </li>
        </ul>
      </nav>
    </main>
  );
}
