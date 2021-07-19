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
    <main data-measure="center" data-text="center">
      <h1>JavaScript Regenerated</h1>
      <nav>
        <ul className="">
          <li>
            <a href="/generator-functions-vs-classes">{'Generator Functions vs Classes'}</a>
          </li>
          <li>
            <a href="/make/parser">{'Make a Parser'}</a>
          </li>
          <li>
            <a href="/make/renderer">{'Make an HTML & CSS Renderer'}</a>
          </li>
          <li>
            <a href="/multiproducers">{'Multi-Producer Components'}</a>
          </li>
          <li>
            <a href="/glossary">{'Glossary'}</a>
          </li>
          <li>
            <a href="/thanks">{'Thanks'}</a>
          </li>
        </ul>
      </nav>
      <p>Message from the loader: {data.message}</p>
    </main>
  );
}
