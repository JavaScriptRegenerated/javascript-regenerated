export const identifiers = {
  link: "link",
  remoteImage: "remoteImage",
  html: "html",
  cssRule: "cssRule",
  cssClassName: "cssClassName",
  image: "image",
} as const;

function taggedString(strings: TemplateStringsArray, ...values: Array<string | number>): string {
  return Array.from(
    (function* () {
      for (const [i, s] of strings.entries()) {
        yield s;
        if (values[i] != null) {
          yield values[i];
        }
      }
    })()
  ).join("")
}

const out = {
  Link: (to: string, text: string) =>
    Object.freeze({
      type: identifiers.link,
      to,
      text,
    }),
  RemoteImage: (url: string, alt: string) =>
    Object.freeze({
      type: identifiers.remoteImage,
      url,
      alt,
    }),
  HTML: (strings: TemplateStringsArray, ...values: Array<string | number>) =>
    Object.freeze({
      type: identifiers.html,
      raw: taggedString(strings, ...values),
    }),
  CSS: (selector: string, rules: string) =>
    Object.freeze({
      type: identifiers.cssRule,
      selector,
      rules,
    }),
};

export const { HTML, CSS, Link, RemoteImage } = out;

export type RenderingMessage = ReturnType<
  typeof out.HTML | typeof out.CSS | typeof out.Link | typeof out.RemoteImage
>;

export function* processHTML(
  generator: () => Generator<RenderingMessage, void, void>
) {
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
    } else if (result.value.type === identifiers.remoteImage) {
      yield `<img src="${result.value.url}" alt="${result.value.alt}">`;
      yield "\n";
    }
  }
}

export function* processCSS(
  generator: () => Generator<RenderingMessage, void, void>
) {
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

export function* allLinks(
  generator: () => Generator<RenderingMessage, void, void>
) {
  const gen = generator();
  while (true) {
    const result = gen.next();
    if (result.done) break;

    if (result.value.type === identifiers.link) {
      yield result.value.to;
    }
  }
}

export function* allLoadedOrigins(
  generator: () => Generator<RenderingMessage, void, void>
) {
  const gen = generator();
  while (true) {
    const result = gen.next();
    if (result.done) break;

    if (result.value.type === identifiers.remoteImage) {
      const url = new URL(result.value.url);
      yield url.origin;
    }
  }
}

export function* processMetaLinkHTML(
  generator: () => Generator<RenderingMessage, void, void>
) {
  for (const origin of allLoadedOrigins(generator)) {
    yield HTML`<link rel="dns-prefetch" href="${origin}">`;
  }
}
