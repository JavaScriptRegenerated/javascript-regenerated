import type { LinksFunction, LoaderFunction } from "remix";
import { Meta, Links, Scripts, useRouteData, LiveReload } from "remix";
import { Outlet } from "react-router-dom";

import stylesUrl from "./styles/global.css";
import telaCSS from "./styles/tela.css";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: telaCSS },
  ];
};

export let loader: LoaderFunction = async () => {
  return { date: new Date() };
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/components/prism-core.min.js"
          integrity="sha512-hqRrGU7ys5tkcqxx5FIZTBb7PkO2o3mU6U5+qB9b55kgMlBUT4J2wPwQfMCxeJW1fC8pBxuatxoH//z0FInhrA=="
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/plugins/autoloader/prism-autoloader.min.js"
          integrity="sha512-ROhjG07IRaPZsryG77+MVyx3ZT5q3sGEGENoGItwc9xgvx+dl+s3D8Ob1zPdbl/iKklMKp7uFemLJFDRw0bvig=="
          crossOrigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
        />
        <script>window.Prism.highlightAll();</script>
      </head>
      <body>
        {children}

        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  let data = useRouteData();
  return (
    <Document>
      <Outlet />
      <footer role="contentinfo">
        <p>This page was rendered at {data.date.toLocaleString()}</p>
      </footer>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
