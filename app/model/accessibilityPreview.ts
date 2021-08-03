const labelledTextInput: unique symbol = Symbol("labelledTextInput");
const button: unique symbol = Symbol("button");
const checkbox: unique symbol = Symbol("checkbox");
const fieldset: unique symbol = Symbol("fieldset");
export const Disabled: unique symbol = Symbol("Disabled");

export const ids = {
  labelledTextInput,
  button,
  fieldset,
} as const;

export function Textbox(
  name: string,
  options: Array<typeof Disabled> = []
) {
  return Object.freeze({
    type: ids.labelledTextInput,
    name,
    disabled: options.includes(Disabled),
  } as const);
}

export function Button(name: string, options: Array<typeof Disabled> = []) {
  return Object.freeze({
    type: ids.button,
    name,
    disabled: options.includes(Disabled),
  } as const);
}

export function Fieldset(
  legend: string,
  children: Array<ReturnType<typeof Textbox | typeof Button>>,
  options: Array<typeof Disabled> = []
) {
  return Object.freeze({
    type: ids.fieldset,
    name: legend,
    children,
    disabled: options.includes(Disabled),
  } as const);
}

export type RenderingMessage = ReturnType<
  typeof Textbox | typeof Button | typeof Fieldset
>;

export function* processHTML(
  generator: () => Iterable<RenderingMessage>
): Generator<string> {
  for (const message of generator()) {
    if (message.type === ids.labelledTextInput) {
      yield "<label class='Y'>";
      yield `<span>${message.name}</span>`;
      yield "<input type=text";
      if (message.disabled) yield " disabled";
      yield ">";
      yield "</label>";
      yield "\n";
    } else if (message.type === ids.button) {
      yield "<button>";
      if (message.disabled) yield " disabled";
      yield message.name;
      yield "</button>";
      yield "\n";
    } else if (message.type === ids.fieldset) {
      yield "<fieldset";
      if (message.disabled) yield " disabled";
      yield ">";
      yield "<legend>";
      yield message.name;
      yield "</legend>";
      yield* processHTML(() => message.children);
      yield "\n";
    }
  }
}

export function* previewVoiceOver(generator: () => Iterable<RenderingMessage>) {
  for (const message of generator()) {
    if (message.type === ids.labelledTextInput) {
      if (message.disabled) {
        yield `${message.name}. Dimmed. Edit text.`;
      } else {
        yield `${message.name}. Edit. Type in text.`;
      }
    } else if (message.type === ids.button) {
      if (message.disabled) {
        yield `${message.name}. Dimmed. Edit text.`;
      } else {
        yield `${message.name}. Button.`;
      }
    } else if (message.type === ids.fieldset) {
      if (message.disabled) {
        yield `${message.name}. Dimmed. Group.`;
      } else {
        const child = message.children[0];
        if (child !== undefined) {
          yield* previewJAWS(() => [child]);
        }
        yield `${message.name}. Group.`;
      }
    }
  }
}

export function* previewJAWS(
  generator: () => Iterable<RenderingMessage>
): Generator<string> {
  for (const message of generator()) {
    if (message.type === ids.labelledTextInput) {
      if (message.disabled) {
        yield `[Label] ${message.name}. [Input] Edit. Unavailable.`;
      } else {
        yield `${message.name}. Edit text.`;
      }
    } else if (message.type === ids.button) {
      if (message.disabled) {
        yield `${message.name}. Button. Unavailable.`;
      } else {
        yield `${message.name}. Button.`;
      }
    } else if (message.type === ids.fieldset) {
      if (message.disabled) {
        yield `Group. Start. ${message.name}.`;
      } else {
        yield `${message.name}. Group.`;
        const child = message.children[0];
        if (child !== undefined) {
          yield* previewJAWS(() => [child]);
        }
      }
    }
  }
}
