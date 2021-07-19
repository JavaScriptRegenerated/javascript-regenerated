export const identifiers = {
  html: "html",
  cssRule: "cssRule",
  cssClassName: "cssClassName",
  image: "image",
} as const;

export const out = {
  html: (raw: TemplateStringsArray) => ({
    type: identifiers.html,
    raw: raw.raw.join(""),
  }),
  css: (selector: string, rules: string) => ({
    type: identifiers.cssRule,
    selector,
    rules,
  }),
};

export type ParsingMessage = string | RegExp;

export function parseString<Result>(
  input: string,
  generator: () => Generator<
    ParsingMessage,
    Result,
    string | RegExpMatchArray | undefined
  >
) {
  let lastResult: string | RegExpMatchArray | undefined;

  const gen = generator();
  while (true) {
    const result = gen.next(lastResult);
    if (result.done) {
      return Object.freeze({
        success: true,
        remaining: input,
        result: result.value,
      });
    }

    const matcher = result.value;
    if (typeof matcher === "string") {
      let found = false;
      const newInput = input.replace(matcher, (_1, offset: number) => {
        found = offset === 0;
        return "";
      });
      if (found) {
        lastResult = matcher;
        input = newInput;
        continue;
      }
    } else if (matcher instanceof RegExp) {
      if (["^", "$"].includes(matcher.source[0]) === false) {
        throw new Error(`Regex must be from start: ${matcher}`);
      }
      const match = input.match(matcher);
      if (match) {
        lastResult = match;
        // input = input.replace(item, '');
        input = input.slice(match[0].length);
        continue;
      }
    }

    return Object.freeze({
      success: false,
      remaining: input,
      failedOnMessage: matcher,
    });
  }
}
