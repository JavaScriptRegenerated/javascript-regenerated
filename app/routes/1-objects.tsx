import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import {
  loadHeroIcons,
  loadSimpleIcons,
  typeLoadedIconComponent,
} from "../view/icons";
import { CodeBlock } from "../view/code";

export let meta: MetaFunction = () => {
  return {
    title: "Message Primitives: JavaScript Regenerated",
    description: "",
  };
};

export let links: LinksFunction = () => {
  return [];
};

const heroIcons = [
  "solid/cube.svg",
  "solid/cube-transparent.svg",
  "solid/scale.svg",
  "solid/arrows-expand.svg",
] as const;

export let loader: LoaderFunction = async () => {
  return {
    icons: await loadHeroIcons(heroIcons),
  };
};

const LoadedIcon = typeLoadedIconComponent<typeof heroIcons[-1]>();

function MessagePrimitivesGraphic(): JSX.Element {
  return (
    <svg viewBox="0 0 180 80">
      <rect width="100%" height="100%" fill="black" />
      <g x="20" fontSize="8" fill="white">
        <LoadedIcon
          name="solid/cube.svg"
          width={12}
          height={12}
          x={10}
          y={12}
        />
        <text x="30" y="20">
          <tspan fontWeight="bold">A richer model</tspan>
        </text>

        <LoadedIcon
          name="solid/arrows-expand.svg"
          width={12}
          height={12}
          x={10}
          y={32}
          stroke="currentColor"
        />
        <text x="30" y="40">
          <tspan fontWeight="bold">Decision explosion</tspan>
        </text>

        <LoadedIcon
          name="solid/scale.svg"
          width={12}
          height={12}
          x={10}
          y={51}
        />
        <text x="30" y="60">
          <tspan fontWeight="bold">Do we do it this way or that way?</tspan>
        </text>
      </g>
    </svg>
  );
}

function MessagePrimitivesCode() {
  return (
    <CodeBlock language="javascript">
      {`
// Do we set properties when initializing?
class Recipe {
  constructor(ingredients, steps) {
    …
  }
}


// Do we allow setting properties after initializing?
class Recipe {
  setIngredients(ingredients) { … }
  setSteps(steps) { … }
}


// Do we allow both?
class Recipe {
  constructor(ingredients, steps) { … }
  setIngredients(ingredients) { … }
  setSteps(steps) { … }
}


// Does the chef turn on the oven?
class Chef {
  makeRecipe(recipe) {
    this.oven.turnOn();
    recipe.make();
  }
}


// Does the recipe turn on the oven only if needs?
class Chef {
  makeRecipe(recipe) {
    recipe.make(this.oven);
  }
}
class Recipe {
  make(oven) {
    if (this.needsOvenPreheated) {
      oven.turnOn();
    }
    …
  }
}


// Which class do we add the purchase ingredients method to?
purchaseIngredients(ingredients) {
  …
}

class Chef {
  purchaseIngredients(ingredients) { … }
}
class Manager {
  purchaseIngredients(ingredients) { … }
}
class Ingredients {
  purchase() { … }
}
`.trim()}
    </CodeBlock>
  );
}

export default function MessagePrimitivesPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Object-Oriented Modelling</h1>
      <MessagePrimitivesGraphic />
      <MessagePrimitivesCode />

      {/* <hr data-y="100vh" /> */}
    </main>
  );
}
