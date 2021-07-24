import { useRouteData } from "remix";

export function fetchSimpleIcon(name: string) {
  return fetch(
    // `https://collected.systems/1/github/simple-icons/simple-icons/5.7.0/icons/${name}`
    `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@5.7.0/icons/${name}`,
    { cache: "force-cache" }
  ).then((res) => res.text());
}

export async function loadSimpleIcons(
  icons: ReadonlyArray<string>
): Promise<Record<string, string>> {
  return Object.fromEntries(
    await Promise.all(
      function* () {
        for (const name of icons) {
          yield fetchSimpleIcon(name).then((code) => [name, code]);
        }
      }.call(null)
    )
  );
}

export function LoadedIcon<Name extends string>({
  name,
  ...rest
}: {
  name: Name;
} & Pick<React.SVGProps<SVGElement>, "width" | "height" | "x" | "y">) {
  const { icons } = useRouteData();

  return <svg {...rest} dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

export function typeLoadedIconComponent<Name extends string>() {
    return LoadedIcon;
}
