import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Link } from "remix";
import { useLoaderData } from "remix";
import { PrimaryNavigation } from "../navs/primary";

import stylesUrl from "../styles/index.css";
import { loadHeroIcons, typeLoadedIconComponent } from "../view/icons";

export let meta: MetaFunction = () => {
  return {
    title: "JavaScript Regenerated",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const heroIcons = ["solid/chat-alt-2.svg"] as const;

export let loader: LoaderFunction = async () => {
  return {
    icons: await loadHeroIcons(heroIcons),
  };
};

const LoadedIcon = typeLoadedIconComponent<typeof heroIcons[-1]>();

export default function Index() {
  return (
    <main data-measure="center" data-text="center">
      <h1>JavaScript Regenerated</h1>
      <div style={{ color: "white" }}>
        {/* <LoadedIcon name="solid/chat-alt-2.svg" width={120} height={120} /> */}
        <svg width="120" height="120">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" fill="#FABE5A"></path>
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" fill="#B7ADFF"></path>
          </svg>
        </svg>
        <h2 style={{ paddingTop: "0rem" }}>
          Make Components using <br /> Message Generators
        </h2>
      </div>
      <PrimaryNavigation />
    </main>
  );
}
