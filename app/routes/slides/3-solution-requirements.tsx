import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Solution Requirements: JavaScript Regenerated",
  };
};

const points = `
- Leverages web standards. No compiler needed.
- Works in today’s tools with syntax highlighting & autocomplete. Leverage TypeScript & JSDoc. Can use TypeScript. Can use code formatters and linters.
- Linear / unidirectional — easy mental model
- Component model that allows composition
`.trim().split('\n');

export default function SolutionRequirements() {
  return (
    <>
      {points.map(point => <p>{point}</p>)}
    </>
  );
}
