import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Intro: JavaScript Regenerated",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return { };
};

export default function Intro() {
  let data = useLoaderData();

  return (
    <>
      <h2>{'I’m Patrick Smith'}</h2>
      <p>{'I’m 32, I’ve been doing design & development for 20 years, and professionally for a dozen.'}</p>
    </>
  );
}
