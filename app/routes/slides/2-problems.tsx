import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Problems: JavaScript Regenerated",
  };
};

const points = `
- Too much tooling in today’s JavaScript world. Needs constant updates & attention. Just to do basic stuff!
- View components feel like a mostly ‘solved’ problem in today’s web apps. What about the rest of the app? The data model? Routing?
- Using React means our development is tied to Facebook’s needs. Facebook’s needs are unique — they don’t need SEO for one example.
- Dev teams have out-sourced their ability to make web apps and great user experiences to the React core team.
`.trim().split('\n');

export default function Problems() {
  return (
    <>
      {points.map(point => <p>{point}</p>)}
    </>
  );
}
