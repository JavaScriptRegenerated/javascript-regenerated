import type { MetaFunction } from "remix";
import { PrimaryNavigation } from "../navs/primary";

export let meta: MetaFunction = () => {
  return { title: "Ain't nothing here" };
};

export default function FourOhFour() {
  return (
    <main data-measure="center">
      <h1>404 Page not found</h1>
    
      <h2>Main menu</h2>
      <PrimaryNavigation />
    </main>
  );
}
