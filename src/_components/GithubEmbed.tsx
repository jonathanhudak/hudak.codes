import {
  githubUrlToScriptId,
  createHTMLCodeSnippet,
} from "https://deno.land/x/github_embed@0.1.0/mod.ts";

const origin = "https://jonathanhudak-github-embed.deno.dev";
export default (props: { src: string }) => {
  if (!props.src) return null;
  const scriptId = githubUrlToScriptId(props.src);
  const markup = {
    __html: createHTMLCodeSnippet(scriptId, origin),
  };
  return <div class="box" dangerouslySetInnerHTML={markup} />;
};
