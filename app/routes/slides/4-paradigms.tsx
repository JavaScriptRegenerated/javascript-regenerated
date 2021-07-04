import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Paradigms in Programming: JavaScript Regenerated",
  };
};

const points = `
- Object-oriented — Java style that puts the focus on objects
- Functional
- Declarative — state my intent: the what not the why
- Message-oriented — Objective-C style
`.trim().split('\n');

export default function SolutionRequirements() {
  return (
    <>
      <h2>Paradigms in Programming</h2>
      {points.map(point => <p>{point}</p>)}
    </>
  );
}
