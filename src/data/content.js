import posts from "../generated/posts.json";
const bodies = import.meta.glob("../generated/entries/*.json", {
  import: "default",
});
const cache = new Map();
const pending = new Map();
export const getPost = (slug) => cache.get(slug);
export async function loadPost(slug) {
  if (cache.has(slug)) return cache.get(slug);
  if (pending.has(slug)) return pending.get(slug);
  const metadata = posts.find((post) => post.slug === slug);
  const loader = bodies[`../generated/entries/${slug}.json`];
  if (!metadata || !loader) return null;
  const request = loader()
    .then((body) => {
      const post = { ...metadata, ...body };
      cache.set(slug, post);
      pending.delete(slug);
      return post;
    })
    .catch((error) => {
      pending.delete(slug);
      throw error;
    });
  pending.set(slug, request);
  return request;
}
export async function loadPostFromPath(path) {
  const match = path.match(/^\/(blog|articles)\/([^/]+)\/?$/);
  if (!match) return;
  const metadata = posts.find(
    (post) =>
      post.slug === match[2] &&
      (post.type === "blog" ? "blog" : "articles") === match[1],
  );
  if (metadata) await loadPost(metadata.slug);
}
