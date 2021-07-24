import { useRouteData } from "remix";

export function fetchGitHubIcon(repo: string, version: string, path: string) {
  return fetch(`https://cdn.jsdelivr.net/gh/${repo}@${version}${path}`, {
    cache: "force-cache",
  }).then((res) => res.text());
}

export function fetchSimpleIcon(name: string) {
  return fetchGitHubIcon(
    "simple-icons/simple-icons",
    "5.7.0",
    `/icons/${name}`
  );
}

export function fetchHeroIcon(name: string) {
  return fetchGitHubIcon(
    "tailwindlabs/heroicons",
    "1.0.0",
    `/optimized/${name}`
  );
}

export async function loadIconsUsing(
  icons: ReadonlyArray<string>,
  loader: (name: string) => Promise<string>
): Promise<Record<string, string>> {
  return Object.fromEntries(
    await Promise.all(
      function* () {
        for (const name of icons) {
          yield loader(name).then((code) => [name, code]);
        }
      }.call(null)
    )
  );
}

export async function loadSimpleIcons(
  icons: ReadonlyArray<string>
): Promise<Record<string, string>> {
  return loadIconsUsing(icons, fetchSimpleIcon);
}

export async function loadHeroIcons(
  icons: ReadonlyArray<string>
): Promise<Record<string, string>> {
  return loadIconsUsing(icons, fetchHeroIcon);
}

interface LoadedIconProps<Name extends string>
  extends Pick<React.SVGProps<SVGElement>, "width" | "height" | "x" | "y" | "fill"> {
  name: Name;
}
export function LoadedIcon<Name extends string>({
  name,
  ...rest
}: LoadedIconProps<Name>) {
  const { icons } = useRouteData();

  return <svg {...rest} dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

export function typeLoadedIconComponent<Name extends string>(): (
  props: LoadedIconProps<Name>
) => JSX.Element {
  return LoadedIcon;
}
