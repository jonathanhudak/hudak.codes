import React from "react";
import { Link } from "gatsby";
import "./global.css";

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
