import type { PageData } from "lume/core.ts";

export default function ({ search }: PageData) {
  const posts = search.pages("type=post published=true");

  return `
    <ul>
      ${posts
        .sort((a, b) => b.data.date - a.data.date)
        .map(
          (post) =>
            `<li>${post.data.date.toLocaleDateString()} - <a href="${
              post.data.url
            }">${post.data.title}</a></li>`
        )
        .join("")}
    </ul>
  `;
}
