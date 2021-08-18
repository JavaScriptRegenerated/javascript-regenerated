export function ClientModule({ source }: { source: string }): JSX.Element {
  return <script type="module" dangerouslySetInnerHTML={{ __html: source }} />;
}
