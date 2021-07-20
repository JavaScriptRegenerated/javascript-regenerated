import React from "react";

export function LabelledSection(props: {
  id: string;
  heading: JSX.Element;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section id={props.id}>
      {React.cloneElement(props.heading, { "aria-labelledby": props.id })}
      {props.children}
    </section>
  );
}
