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

export type ParsingMessage = string | number | RegExp | Array<string | number | RegExp>;
export type ParsingReply = string | number | RegExpMatchArray | undefined;

export function parseString<Result>(
  input: string,
  generator: () => Generator<
    ParsingMessage,
    Result,
    ParsingReply
  >
) {
  let reply: ParsingReply;

  const gen = generator();
  mainLoop: while (true) {
    const result = gen.next(reply);
    if (result.done) {
      return Object.freeze({
        success: true,
        result: result.value,
        remaining: input,
      });
    }

    const message = result.value;
    const matchers = new Array<ParsingMessage>().concat(message);

    for (let matcher of matchers) {
      if (typeof matcher === "string" || typeof matcher === 'number') {
          const searchString = matcher.toString()
        let found = false;
        const newInput = input.replace(searchString, (_1, offset: number) => {
          found = offset === 0;
          return "";
        });
        if (found) {
          reply = matcher;
          input = newInput;
          continue mainLoop;
        }
      } else if (matcher instanceof RegExp) {
        if (["^", "$"].includes(matcher.source[0]) === false) {
          throw new Error(`Regex must be from start: ${matcher}`);
        }
        const match = input.match(matcher);
        if (match) {
          reply = match;
          // input = input.replace(item, '');
          input = input.slice(match[0].length);
          continue mainLoop;
        }
      }
    }

    return Object.freeze({
      success: false,
      failedOnMessage: message,
      remaining: input,
    });
  }
}
