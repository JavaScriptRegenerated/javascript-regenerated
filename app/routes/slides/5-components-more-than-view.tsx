import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "More Than Just The View: JavaScript Regenerated",
  };
};

const points = `
- React assists with view: \`view = f(data)\`
- React with hooks assists with controller: \`[view, state] = f(data, events)\`
- Why do we stop here? I think partially because React is seen as ‘magic’ that the browser ideally should be doing. “The React core team has made an optimised set of standards for making web (& mobile) apps.” We’d be going back to the stone ages if we used the standards we were given. The React core team is smarter that my team, I’ll create a better developer experience & user experience by using their work.
`.trim().split('\n');

export default function MoreThanJustTheView() {
  return (
    <>
      <h2>Components for more than just the view</h2>
      {points.map(point => <p>{point}</p>)}
    </>
  );
}
