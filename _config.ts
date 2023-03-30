import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import mdx from "lume/plugins/mdx.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import prism from "lume/plugins/prism.ts";
import date from "lume/plugins/date.ts";
// https://unpkg.com/browse/prismjs@1.29.0/components/
import "npm:prismjs@1.29.0/components/prism-bash.js";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import modifyUrls from "lume/plugins/modify_urls.ts";
import StackBlitzEmbed from "./src/lib/StackBlitzEmbed.tsx";
const site = lume({
  src: "./src",
});

site.use(jsx());
site.use(date());

site.use(
  mdx({
    components: {
      IframeEmbed: StackBlitzEmbed,
      StackBlitzEmbed,
    },
  })
);
site.use(
  prism({
    extensions: [".md", ".mdx"],
  })
);

site.preprocess([".mdx"], async (page) => {
  const content = page?.data?.content?.toString();
  const regex = /\[GithubEmbed\s+url="([^"]+)"\]/;

  if (content) {
    // Extract the URL value
    const urlMatch = content.match(regex);
    const githubEmbedUrl = urlMatch ? urlMatch[1] : "";

    if (urlMatch) {
      const { scriptId, url } = await (
        await fetch("https://jonathanhudak-github-embed.deno.dev/embed-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            githubUrl: githubEmbedUrl,
          }),
        })
      ).json();
      const htmlString = `
<div class="box">
<div id="ghe-${scriptId}"></div>
<script type="module" src="https://jonathanhudak-github-embed.deno.dev/embed-script/${scriptId}"></script>
<footer>
<a href="${url}">${url}</a>
</footer>
</div>`;
      const output = content.replace(regex, htmlString);
      page.data.content = output;
    }
  }
});
site.use(lightningCss());
site.use(modifyUrls());

export default site;
