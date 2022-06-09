import * as React from "react";
import { Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";

const LazyRelativePostDate = React.lazy(() => import("./RelativePostDate"));

interface PostFrontMatter {
  date: string;
  title: string;
}

interface Post {
  slug: string;
  frontmatter: PostFrontMatter;
  excerpt: string;
}

interface PostIndexProps {
  posts: Post[];
}

function PostDate({ dateTime }) {
  const isSSR = typeof window === "undefined";
  return (
    <div className="flex flex-justify">
      <time dateTime={dateTime}>
        {new Date(dateTime).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </time>{" "}
      {!isSSR && (
        <React.Suspense fallback={<span />}>
          <LazyRelativePostDate dateTime={dateTime} />
        </React.Suspense>
      )}
    </div>
  );
}

export default function PostsIndex({ posts }: PostIndexProps) {
  return (
    <ul className="PostsIndex">
      {posts.map((post: Post) => (
        <li key={post.slug} className="u-flow">
          <h2>
            <Link to={`/${post.slug.replaceAll("_", "-")}`}>
              {post.frontmatter.title}
            </Link>
          </h2>
          <PostDate dateTime={post.frontmatter.date} />
          <div>
            <MDXProvider>{post.excerpt}</MDXProvider>
          </div>
        </li>
      ))}
    </ul>
  );
}
