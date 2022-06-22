import * as React from "react";
import { Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";

const LazyRelativePostDate = React.lazy(() => import("./RelativePostDate"));

interface PostFrontMatter {
  date: string;
  title: string;
  published: boolean;
}

interface Post {
  slug: string;
  frontmatter: PostFrontMatter;
  fileAbsolutePath: string;
  excerpt: string;
}

interface PostIndexProps {
  posts: Post[];
}

interface PostDateProps {
  dateTime: string;
}

function PostDate({ dateTime }: PostDateProps) {
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

enum Filter {
  Posts = "posts",
  Published = "published",
}

const FILTERS = {
  [Filter.Posts]: (n: Post) => n.fileAbsolutePath.includes("/posts/"),
  [Filter.Published]: (n: Post) => {
    return n.frontmatter.published === true;
  },
};

function applyFilters(posts: Post[], filters: Filter[]): Post[] {
  return filters.reduce(
    (acc, filterKey) => acc.filter(FILTERS[filterKey]),
    posts
  );
}

interface AdminFilters {
  currentFilters: Filter[];
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AdminFilters({ currentFilters, onToggle }: AdminFilters) {
  if (process.env.NODE_ENV === "development") {
    return (
      <div>
        <hr />
        <h2>Admin Section</h2>
        <label>Show only published posts:</label>&nbsp;
        <input
          name="published"
          type="checkbox"
          onChange={onToggle}
          checked={currentFilters.includes(Filter.Published)}
        />
      </div>
    );
  }

  return null;
}

export default function PostsIndex({ posts }: PostIndexProps) {
  const [filters, setFilters] = React.useState<Filter[]>([
    Filter.Posts,
    Filter.Published,
  ]);

  function onToggleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    const filter = name as Filter;
    const newFilters = checked
      ? [...filters, filter]
      : filters.filter((f) => f !== filter);
    setFilters(newFilters);
  }

  console.log(posts);

  console.info(filters, applyFilters(posts, filters));

  return (
    <>
      <ul className="PostsIndex">
        {applyFilters(posts, filters).map((post: Post) => (
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
      <AdminFilters onToggle={onToggleFilter} currentFilters={filters} />
    </>
  );
}
