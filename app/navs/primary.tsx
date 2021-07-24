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
          <Link to="/generator-functions-vs-classes">
            {"Generator Functions vs Classes"}
          </Link>
        </li>
        {makeNavItems}
        <li>
          <Link to="/glossary">{"Glossary"}</Link>
        </li>
        <li>
          <Link to="/thanks">{"Thanks"}</Link>
        </li>
      </ul>
    </nav>
  );
}
