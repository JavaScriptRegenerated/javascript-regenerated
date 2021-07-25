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
      <nav data-links="underline-on-hover">
        <ul>
          <li>
            <a href="https://remix.run">Remix — React framework</a>
          </li>
          <li>
            <a href="https://github.com/tailwindlabs/heroicons">Hero Icons</a>
          </li>
          <li>
            <a href="https://overreacted.io/preparing-for-tech-talk-part-3-content/">Preparing for Tech Talk by Dan Abramov</a>
          </li>
        </ul>
      </nav>
      <h2>Reach out</h2>
      <nav data-links="underline-on-hover">
        <ul>
          <li>
            <a href="https://twitter.com/concreteniche">@concreteniche on Twitter</a>
          </li>
          <li>
            <a href="https://github.com/RoyalIcing">@RoyalIcing org on Github</a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
