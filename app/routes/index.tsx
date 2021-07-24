import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Link } from "remix";
import { useRouteData } from "remix";
import { PrimaryNavigation } from "../navs/primary";

import stylesUrl from "../styles/index.css";
import { loadHeroIcons, typeLoadedIconComponent } from "../view/icons";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const heroIcons = [
  "solid/chat-alt-2.svg",
] as const;

export let loader: LoaderFunction = async () => {
  return {
    icons: await loadHeroIcons(heroIcons),
  };
};

const LoadedIcon = typeLoadedIconComponent<
  typeof heroIcons[-1]
>();

export default function Index() {
  return (
    <main data-measure="center" data-text="center">
      <h1>JavaScript Regenerated</h1>
      <div style={{ color: "white" }}>
        <LoadedIcon name="solid/chat-alt-2.svg" width={120} height={120} />
        <h2 style={{ paddingTop: "0rem" }}>Make Components using <br /> Message Generators</h2>
      </div>
      <PrimaryNavigation />
    </main>
  );
}
