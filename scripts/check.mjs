import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
const posts = JSON.parse(await readFile("src/generated/posts.json", "utf8"));
assert.equal(
  posts.filter((p) => p.type === "blog").length,
  1,
  "Expected exactly one blog post",
);
assert.equal(
  posts.filter((p) => p.type === "article").length,
  1,
  "Expected exactly one article",
);
for (const post of posts) {
  assert(post.words >= 4000);
  assert.equal(post.author, "satyam2003-dev");
}
const root = resolve("dist");
for (const post of posts) {
  const body = JSON.parse(
    await readFile(`src/generated/entries/${post.slug}.json`, "utf8"),
  );
  const route = `${post.type === "blog" ? "blog" : "articles"}/${post.slug}/index.html`;
  const html = await readFile(resolve(root, route), "utf8");
  assert.equal(
    [...html.matchAll(/class="article-section"/g)].length,
    body.sections.length,
    `Full article must be prerendered: ${route}`,
  );
  for (const section of body.sections)
    assert(
      html.includes(`id="${section.id}"`),
      `Missing prerendered section ${section.id}`,
    );
}
let pages = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (!path.endsWith(".html")) continue;
    pages++;
    const html = await readFile(path, "utf8");
    assert.match(html, /<title>.+<\/title>/);
    assert.match(html, /<main id="main"/);
    assert.match(html, /<meta name="author" content="satyam2003-dev"/);
    assert.match(
      html,
      /<link rel="canonical" href="https:\/\/satyam2003-dev.github.io\//,
    );
    assert(
      !/dc-import|x-dc|\{\{|OSCP|PEN-200|photo or avatar|Sec-Notes\//.test(
        html,
      ),
      `Template artifact in ${path}`,
    );
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs in ${path}`);
    for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|data:)/.test(href)) continue;
      if (href.startsWith("#")) {
        assert(ids.includes(href.slice(1)), `Missing anchor ${href}`);
        continue;
      }
      assert(
        href.startsWith("/"),
        `Assets and routes must be root-relative: ${href}`,
      );
      const target = resolve(root, "." + href.split(/[?#]/)[0]);
      const info = await stat(target).catch(() => null);
      assert(info, `Broken local link ${href} in ${path}`);
      if (info.isDirectory())
        assert((await stat(target + "/index.html")).isFile());
      const hash = href.split("#")[1];
      if (hash) {
        const destination = await readFile(
          info.isDirectory() ? target + "/index.html" : target,
          "utf8",
        );
        assert(
          destination.includes(`id="${hash}"`),
          `Missing linked anchor ${href} in ${path}`,
        );
      }
    }
  }
}
await walk(root);
assert.equal(pages, 8, "Seven prerendered pages plus custom 404 expected");
console.log(
  `Validated ${pages} pages: content minimums, authors, prerendering, metadata, links and anchors.`,
);
