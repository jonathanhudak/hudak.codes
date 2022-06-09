import React from "react";
import { Link } from "gatsby";
import "./global.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <nav className="nav">
          <Link to="/">hudak.codes</Link>
          <Link to="/about">About </Link>
        </nav>
      </header>
      <main className="u-flow">{children}</main>
      <footer>
        <a href="https://jonathanhudak.com/">Jonathan Hudak</a> © 2022{" "}
      </footer>
    </div>
  );
}
