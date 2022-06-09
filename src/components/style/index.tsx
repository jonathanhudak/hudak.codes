import React from "react";

export default function SecondaryText({ Element = "span", children }) {
  return <Element className="text--secondary">{children}</Element>;
}
