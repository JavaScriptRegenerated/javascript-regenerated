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
      <nav data-links="underline-on-hover" data-text="italic">
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
      <h2>Please reach out!</h2>
      <nav data-links="underline-on-hover" data-text="1">
        <ul>
          <li>
            <a href="https://twitter.com/concreteniche" style={{ color: "#F59E0B" }}>@concreteniche</a> on Twitter
          </li>
          <li>
            <a href="https://github.com/RoyalIcing" style={{ color: "#EC4899" }}>@RoyalIcing</a> on GitHub
          </li>
        </ul>
      </nav>
    </main>
  );
}
