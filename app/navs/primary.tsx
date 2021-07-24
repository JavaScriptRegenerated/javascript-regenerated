import { Link } from "remix";

export const makeNavItems = (
  <>
    <li>
      <Link to="/make/parser">{"Parser"}</Link>
    </li>
    <li>
      <Link to="/make/html-renderer">{"HTML renderer"}</Link>
    </li>
    <li>
      <Link to="/make/schema">{"Schema validator"}</Link>
    </li>
    <li>
      <Link to="/make/multiproducers">{"Multi-producer components"}</Link>
    </li>
  </>
);

export function PrimaryNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/0-javascript-everywhere">{"JavaScript is everywhere"}</Link>
        </li>
        <li>
          <Link to="/1-linear">{"Linear thinking"}</Link>
        </li>
        <li>
          <Link to="/1-objects">{"Object-oriented"}</Link>
        </li>
        <li>
          <Link to="/1-what-not-how">{"What, not How"}</Link>
        </li>
        <li>
          <Link to="/1-names">{"Two hardest things"}</Link>
        </li>
        <li>
          <Link to="/1-components">{"Component mindset"}</Link>
        </li>
        <li>
          <Link to="/2-message-generators">{"Message generators"}</Link>
        </li>
        <li>
          <Link to="/2-primitives">{"Sending primitives"}</Link>
        </li>
        <li>
          <Link to="/2-message-processors">{"Message processors"}</Link>
        </li>
        <li>
          <Link to="/2-functions">{"Sending functions"}</Link>
        </li>
        <li>
          <Link to="/generator-functions-vs-classes">
            {"Generator functions vs classes"}
          </Link>
        </li>
        {makeNavItems}
        <li>
          <Link to="/5-function-of">{"Function of X"}</Link>
        </li>
        <li>
          <Link to="/glossary">{"Glossary"}</Link>
        </li>
        <li>
          <Link to="/libraries">{"Open source libraries"}</Link>
        </li>
        <li>
          <Link to="/thanks">{"Thanks"}</Link>
        </li>
      </ul>
    </nav>
  );
}
