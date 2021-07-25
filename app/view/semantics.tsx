import React from "react";

export function NamedSection(props: {
  id: string;
  heading: JSX.Element;
  children: React.ReactNode;
}): JSX.Element {
  const headingID = props.id + "_heading";
  return (
    <section id={props.id} aria-labelledby={headingID}>
      {React.cloneElement(props.heading, { id: headingID })}
      {props.children}
    </section>
  );
}
