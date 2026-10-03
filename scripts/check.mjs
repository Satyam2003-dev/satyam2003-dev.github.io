import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { posts } from '../content/posts.mjs';
assert.equal(posts.filter(p=>p.type==='blog').length,1,'Expected exactly one blog post');
assert.equal(posts.filter(p=>p.type==='article').length,1,'Expected exactly one article');
const root = resolve('dist');
async function walk(dir) {
 for(const f of await readdir(dir,{withFileTypes:true})) {
  const path=resolve(dir,f.name);
  if(f.isDirectory()){await walk(path);continue;}
  if(!path.endsWith('.html'))continue;
  const html=await readFile(path,'utf8');
  assert.match(html,/<title>.+<\/title>/);
  assert.match(html,/<main id="main"/);
  assert.match(html,/<meta name="author" content="satyam2003-dev">/);
  assert(!/dc-import|x-dc|\{\{|OSCP|PEN-200|photo or avatar/.test(html),`Template artifact in ${path}`);
  for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
   if(/^(https?:|mailto:|data:)/.test(href)) continue;
   if(href.startsWith('#')) {assert(html.includes(`id="${href.slice(1)}"`),`Missing anchor ${href}`);continue;}
   let target=resolve(dirname(path),href);
   const info=await stat(target).catch(()=>null);
   assert(info,`Broken local link ${href} in ${path}`);
   if(info.isDirectory())assert((await stat(target+'/index.html')).isFile());
  }
 }
}
await walk(root);
console.log('Validated content counts, all internal links, anchors, metadata, and template cleanup.');
