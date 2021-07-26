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

const simpleIcons = [] as const;
const heroIcons = [] as const;

export let loader: LoaderFunction = async () => {
  return {
    icons: {
      ...(await loadSimpleIcons(simpleIcons)),
      ...(await loadHeroIcons(heroIcons)),
    },
  };
};

function SendingFunctionsCode() {
  return (
    <>
      <h2>Parser component</h2>
      <CodeBlock language="javascript" smaller>
        {`
import { parse, mustEnd } from 'yieldparser';

function* IPAddress() {
  const [firstString] = yield /^\d+/;
  const firstDigit = parseInt(firstString, 10);
  yield '.';
  const [secondString] = yield /^\d+/;
  const secondDigit = parseInt(secondString, 10);
  yield '.';
  const [thirdString] = yield /^\d+/;
  const thirdDigit = parseInt(thirdString, 10);
  yield '.';
  const [fourthString] = yield /^\d+/;
  const fourthDigit = parseInt(fourthString, 10);
  yield mustEnd;
  return [firstDigit, secondDigit, thirdDigit, fourthDigit];
}

parse('1.2.3.4', IPAddress());
/*
{
  success: true,
  result: [1, 2, 3, 4],
  remaining: '',
}
*/
`.trim()}
      </CodeBlock>
      <h2>Nested parser components</h2>
      <CodeBlock language="javascript" smaller>
        {`
import { parse, mustEnd } from 'yieldparser';

function* Digit() {
  const [digit] = yield /^\d+/;
  const value = parseInt(digit, 10);
  // Validate digit is inclusively between 0 and 255.
  if (value < 0 || value > 255) {
    return new Error(\`\${value} must be >= 0 && <= 255\`);
  }
  // The number value is the result from this component.
  return value;
}

function* IPAddress() {
  const first = yield Digit;
  yield '.';
  const second = yield Digit;
  yield '.';
  const third = yield Digit;
  yield '.';
  const fourth = yield Digit;
  yield mustEnd;
  return [first, second, third, fourth];
}

parse('1.2.3.4', IPAddress());
/*
{
  success: true,
  result: [1, 2, 3, 4],
  remaining: '',
}
*/
`.trim()}
      </CodeBlock>
    </>
  );
}

export default function MessageProcessorsPage() {
  return (
    <main data-measure="center" data-text="center">
      <h1>Functions can be messages too</h1>
      <SendingFunctionsCode />

      {/* <hr data-y="100vh" /> */}
    </main>
  );
}
