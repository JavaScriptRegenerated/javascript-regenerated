import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Link, Outlet } from "react-router-dom";
import { useRouteData } from "remix";
import { makeNavItems } from "../navs/primary";

export let meta: MetaFunction = () => {
  return {
    title: "Making Component Generators: JavaScript Regenerated",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return {};
};

export default function Index() {
  let data = useRouteData();

  return (
    <>
      <Outlet />
      <hr data-y="100vh" />
      <nav data-measure="center">
        <ul>{makeNavItems}</ul>
      </nav>
    </>
  );
}
