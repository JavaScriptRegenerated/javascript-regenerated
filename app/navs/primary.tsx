export const makeNavItems = (
  <>
    <li>
      <a href="/make/html-renderer">{"HTML renderer"}</a>
    </li>
    <li>
      <a href="/make/schema">{"Schema validator"}</a>
    </li>
    <li>
      <a href="/make/parser">{"Parser"}</a>
    </li>
    <li>
      <a href="/make/state-machine">{"State machine"}</a>
    </li>
    <li>
      <a href="/make/multicolored">{"Multicolored components"}</a>
    </li>
  </>
);

export function PrimaryNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/1-linear">{"Linear thinking"}</a>
        </li>
        <li>
          <a href="/1-objects">{"Object-oriented"}</a>
        </li>
        <li>
          <a href="/1-what-not-how">{"What, not how"}</a>
        </li>
        <li>
          <a href="/1-hard-things">{"Two hardest things"}</a>
        </li>
        <li role="separator" data-y="1" />
        <li>
          <a href="/2-methods-vs-messages">{"Methods vs messages"}</a>
        </li>
        <li>
          <a href="/2-message-generators">{"Message generators"}</a>
        </li>
        <li>
          <a href="/3-message-processors">{"Message processors"}</a>
        </li>
        <li>
          <a href="/3-sending-functions">{"Sending functions"}</a>
        </li>
        <li role="separator" data-y="1" />
        {makeNavItems}
        <li role="separator" data-y="1" />
        <li>
          <a href="/4-function-of">{"More than the view"}</a>
        </li>
        <li>
          <a href="/4-javascript-everywhere">{"JavaScript’s benefits"}</a>
        </li>
        <li>
          <a href="/5-libraries">{"Open source libraries"}</a>
        </li>
        <li role="separator" data-y="1" />
        <li>
          <a href="/5-thanks">{"Thanks"}</a>
        </li>
      </ul>
    </nav>
  );
}
