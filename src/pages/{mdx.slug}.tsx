import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Layout from "../components/Layout";

interface PostPageProps {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

export default function PostPage({ data }: PostPageProps) {
  const {
    body,
    frontmatter: { title },
  } = data.mdx;

  return (
    <Layout>
      <h1>{title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
}

export const query = graphql`
  query PostBySlug($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        date
        title
      }
    }
  }
`;
