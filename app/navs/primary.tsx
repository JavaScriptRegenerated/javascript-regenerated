import type { ComponentProps } from "react";
import { useLocation } from "react-router-dom";

function NavLink(props: ComponentProps<"a">): JSX.Element {
  const location = useLocation();

  const ariaCurrent = location.pathname === props.href ? "page" : undefined;

  return <a aria-current={ariaCurrent} {...props} />;
}

export const makeNavItems = (
  <>
    <li>
      <NavLink href="/make/html-renderer">{"HTML renderer"}</NavLink>
    </li>
    <li>
      <NavLink href="/make/schema">{"Schema validator"}</NavLink>
    </li>
    <li>
      <NavLink href="/make/parser">{"Parser"}</NavLink>
    </li>
    <li>
      <NavLink href="/make/state-machine">{"State machine"}</NavLink>
    </li>
    <li>
      <NavLink href="/make/sqlite">{"SQLite"}</NavLink>
    </li>
    <li>
      <NavLink href="/make/fetch">{"Fetch"}</NavLink>
    </li>
    <li>
      <NavLink href="/make/cli">{"CLI"}</NavLink>
    </li>
    <li>
      <NavLink href="/make/multicolored">{"Multicolored components"}</NavLink>
    </li>
  </>
);

export function PrimaryNavigation({
  name = "Primary",
  includeHome = false,
}: {
  name?: string;
  includeHome?: boolean;
}) {
  return (
    <nav aria-label={name}>
      <ul>
        {includeHome && (
          <li>
            <NavLink href="/">{"Home"}</NavLink>
          </li>
        )}
        <li>
          <NavLink href="/1-linear">{"Linear thinking"}</NavLink>
        </li>
        <li>
          <NavLink href="/1-objects">{"Object-oriented"}</NavLink>
        </li>
        <li>
          <NavLink href="/1-what-not-how">{"What, not how"}</NavLink>
        </li>
        <li>
          <NavLink href="/1-hard-things">{"Two hardest things"}</NavLink>
        </li>
        <li role="separator" data-y="1" />
        <li>
          <NavLink href="/2-methods-vs-messages">
            {"Methods vs messages"}
          </NavLink>
        </li>
        <li>
          <NavLink href="/2-message-generators">{"Message generators"}</NavLink>
        </li>
        <li>
          <NavLink href="/3-message-processors">{"Message processors"}</NavLink>
        </li>
        <li>
          <NavLink href="/3-sending-functions">{"Sending functions"}</NavLink>
        </li>
        <li role="separator" data-y="1" />
        {makeNavItems}
        <li role="separator" data-y="1" />
        <li>
          <NavLink href="/4-why-not">{"More than the view"}</NavLink>
        </li>
        <li>
          <NavLink href="/4-benefits">
            {"JavaScript’s benefits"}
          </NavLink>
        </li>
        <li>
          <NavLink href="/4-libraries">{"Open source libraries"}</NavLink>
        </li>
        <li role="separator" data-y="1" />
        <li>
          <NavLink href="/4-thanks">{"Thanks"}</NavLink>
        </li>
      </ul>
    </nav>
  );
}
