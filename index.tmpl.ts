import type { PageData } from "lume/core.ts";

export default function ({ search }: PageData) {
  const posts = search.pages("type=post");

  return `
    <ul>
      ${posts
        .map(
          (post) => `<li><a href="${post.data.url}">${post.data.title}</a></li>`
        )
        .join("")}
    </ul>
  `;
}
