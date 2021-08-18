const command: unique symbol = Symbol("command");

function Command(name: string) {
  return Object.freeze({
    type: command,
    name,
  });
}

export type CommandLineMessage = ReturnType<
  typeof Command
>;

function parseCommandLine(input: string, component: () => Iterable<CommandLineMessage>)
{

}

////

function* Git() {
  yield "git";
  yield [GitStatus, GitFetch, GitDiff];
}

function* GitStatus() {
  yield Command("status");
}

function* GitShow() {
    yield Command("show");
    const object: string = yield String;
  }

function* GitFetch() {
  yield Command("fetch");
}

function* GitDiff() {
  yield Command("diff");
}
