import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Link, Outlet } from "react-router-dom";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
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
      <main
        data-measure="center"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <Outlet />
      </main>
      <hr data-y="100vh" />
      <nav data-measure="center">
        <ol>
          <li>
            <a href="/slides/1-intro">Intro</a>
          </li>
          <li>
            <a href="/slides/2-problems">Problems</a>
          </li>
          <li>
            <a href="/slides/3-solution-requirements">Solution Requirements</a>
          </li>
          <li>
            <a href="/slides/4-paradigms">Paradigms</a>
          </li>
          <li>
            <a href="/slides/5-components-more-than-view">Components: More than just the View</a>
          </li>
        </ol>
      </nav>
    </>
  );
}
