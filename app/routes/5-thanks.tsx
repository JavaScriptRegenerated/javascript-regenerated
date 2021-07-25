import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Thanks to"
  };
};

export default function Index() {
  return (
    <main data-measure="center">
      <h2>Thanks to</h2>
      <nav>
        <ul>
          <li>
            <a href="https://overreacted.io/preparing-for-tech-talk-part-3-content/">Preparing for Tech Talk by Dan Abramov</a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
