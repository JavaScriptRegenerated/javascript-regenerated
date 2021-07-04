import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return { };
};

export default function Index() {
  let data = useRouteData();

  return (
    <main data-measure="center">
      <h2>JavaScript Regenerated Talk</h2>
    </main>
  );
}
