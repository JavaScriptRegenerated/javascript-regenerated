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

function ObjectOrientedGraphic(): JSX.Element {
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

        {/* <LoadedIcon
          name="solid/arrows-expand.svg"
          width={12}
          height={12}
          x={10}
          y={32}
          color="inherit"
          stroke="currentColor"
        /> */}
        <svg width={12} height={12} x={10} y={31}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19 20"
            fill="currentColor"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4l-4-4m4 4v-4m0 4h-4"
            ></path>
          </svg>
        </svg>
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

function ObjectOrientedCode() {
  return (
    <CodeBlock language="javascript">
      {`
class Recipe {
  // Has ingredients & steps
}


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


// Recipes are made by chefs
class Chef {
  makeRecipe(recipe) {
    …
  }
}


// Does the chef turn on the oven?
class Chef {
  makeRecipe(recipe) {
    this.oven.turnOn();
    recipe.make();
  }
}


// Does the recipe turn on the oven only when needed?
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
class Shop {
  purchase(items) { … }
}
`.trim()}
    </CodeBlock>
  );
}

export default function MessagePrimitivesPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Object-Oriented Modelling</h1>
      <ObjectOrientedGraphic />
      <ObjectOrientedCode />
    </main>
  );
}
