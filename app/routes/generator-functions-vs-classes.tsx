import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Generator Functions vs Classes: JavaScript Regenerated",
    description: "Generator functions allow us to separate the sending and receiving of messages",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return { message: "this is awesome 😎" };
};

export default function Index() {
  let data = useRouteData();

  return (
    <main data-measure="center">
      <h2>Generator Functions vs Classes</h2>
      
      <p>Message from the loader: {data.message}</p>
    </main>
  );
}
