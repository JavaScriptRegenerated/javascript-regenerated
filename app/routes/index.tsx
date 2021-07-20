import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Link } from "remix";
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
  return {};
};

export default function Index() {
  return (
    <main data-measure="center" data-text="center">
      <h1>JavaScript Regenerated</h1>
      <nav>
        <ul>
          <li>
            <Link to="/generator-functions-vs-classes">{'Generator Functions vs Classes'}</Link>
          </li>
          <li>
            <Link to="/make/parser">{'Make a Parser'}</Link>
          </li>
          <li>
            <Link to="/make/renderer">{'Make an HTML & CSS Renderer'}</Link>
          </li>
          <li>
            <Link to="/make/schema">{'Make a Schema validator'}</Link>
          </li>
          <li>
            <Link to="/multiproducers">{'Multi-Producer Components'}</Link>
          </li>
          <li>
            <Link to="/glossary">{'Glossary'}</Link>
          </li>
          <li>
            <Link to="/thanks">{'Thanks'}</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
