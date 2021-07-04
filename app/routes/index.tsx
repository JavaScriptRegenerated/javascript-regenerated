import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return { message: "this is awesome 😎" };
};

export default function Index() {
  let data = useRouteData();

  return (
    <main data-measure="center">
      <h2>JavaScript Regenerated</h2>
      <nav>
        <ul>
          <li>
            <a href="/generator-functions-vs-classes">Generator Functions vs Classes</a>
          </li>
          <li>
            <a href="/make/parser">Make a Parser</a>
          </li>
          <li>
            <a href="/glossary">Glossary</a>
          </li>
        </ul>
      </nav>
      <p>Message from the loader: {data.message}</p>
    </main>
  );
}
