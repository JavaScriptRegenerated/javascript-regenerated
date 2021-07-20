import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "More Than Just The View: JavaScript Regenerated",
  };
};

const points = `
- \`route = f(url)\`
- \`apiData = f(route)\`
- \`request = f(form)\`
- \`state = f(events)\`
- \`localizedText = f(key, value)\`
`.trim().split('\n');

export default function WhyNot() {
  return (
    <>
      <h2>Why don’t we have? —</h2>
      {points.map(point => <p>{point}</p>)}
    </>
  );
}
