import React from "react";

import { MDXProvider } from "@mdx-js/react";
import { Gist } from "mdx-embed";

import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";

function Code({ code, lang }) {
  return (
    <Highlight {...defaultProps} code={code} theme={theme} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} code-block`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

const components = {
  Gist,
  pre: (props) => {
    const className = props.children.props.className || "";

    const matches = className.match(/language-(?<lang>.*)/);

    return (
      <Code
        code={props.children.props.children}
        lang={
          matches && matches.groups && matches.groups.lang
            ? matches.groups.lang
            : ""
        }
      />
    );
  },
};

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};
