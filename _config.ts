import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import mdx from "lume/plugins/mdx.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import prism from "lume/plugins/prism.ts";
// https://unpkg.com/browse/prismjs@1.29.0/components/
import "npm:prismjs@1.29.0/components/prism-bash.js";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import modifyUrls from "lume/plugins/modify_urls.ts";
import StackBlitzEmbed from "./src/lib/StackBlitzEmbed.tsx";
const site = lume({
  src: "./src",
});

site.use(jsx());
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
site.use(lightningCss());
site.use(modifyUrls());

export default site;
