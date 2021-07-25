export const identifiers = {
  link: "link",
  html: "html",
  cssRule: "cssRule",
  cssClassName: "cssClassName",
  image: "image",
} as const;

const out = {
  Link: (to: string, text: string) => ({
    type: identifiers.link,
    to,
    text,
  }),
  HTML: (raw: TemplateStringsArray) => ({
    type: identifiers.html,
    raw: raw.raw.join(""),
  }),
  CSS: (selector: string, rules: string) => ({
    type: identifiers.cssRule,
    selector,
    rules,
  }),
};

export const { HTML, CSS, Link } = out;

export type RenderingMessage = ReturnType<typeof out.HTML | typeof out.CSS | typeof out.Link>;

export function* processHTML(generator: () => Generator<RenderingMessage, void, void>) {
  const gen = generator();
  while (true) {
    const result = gen.next();
    if (result.done) break;

    if (result.value.type === identifiers.html) {
      yield result.value.raw;
      yield "\n";
    } else if (result.value.type === identifiers.link) {
      yield `<a href="${result.value.to}">${result.value.text}</a>`;
      yield "\n";
    }
  }
}

export function* processCSS(generator: () => Generator<RenderingMessage, void, void>) {
  const gen = generator();
  while (true) {
    const result = gen.next();
    if (result.done) break;

    if (result.value.type === identifiers.cssRule) {
      yield result.value.selector.replace(/^/, "output ");
      yield " {";
      yield result.value.rules;
      yield "}";
      yield "\n";
    }
  }
}

export function *allLinks(generator: () => Generator<RenderingMessage, void, void>) {
  const gen = generator();
  while (true) {
    const result = gen.next();
    if (result.done) break;

    if (result.value.type === identifiers.link) {
      yield result.value.to;
    }
  }
}
