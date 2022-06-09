export function sortPostsDateDesc(na, nb) {
  return new Date(nb.frontmatter.date) - new Date(na.frontmatter.date);
}
