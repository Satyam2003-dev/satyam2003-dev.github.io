import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const catalog=JSON.parse(await readFile('content/catalog.json','utf8'));
const posts=[];
for (const record of catalog) {
  const html=await readFile(`content/${record.body}`,'utf8');
  const sections=[...html.matchAll(/<section id="([a-z0-9-]+)">\s*<h2>(.*?)<\/h2>([\s\S]*?)<\/section>/g)].map(([,id,title,body])=>({id,title,html:body.trim()}));
  assert(sections.length>0,`No sections in ${record.body}`);
  assert.equal(new Set(sections.map(s=>s.id)).size,sections.length,'Duplicate section IDs');
  const words=sections.map(s=>s.html.replace(/<[^>]*>/g,' ').replace(/&\w+;/g,' ')).join(' ').trim().split(/\s+/).length;
  assert(words>=4000,`${record.slug}: ${words} words; 4000 required`);
  posts.push({...record,sections,words,minutes:Math.ceil(words/210)});
  console.log(`${record.type}: ${words} words, ${sections.length} sections`);
}
await mkdir('src/generated',{recursive:true});
await writeFile('src/generated/posts.json',JSON.stringify(posts));
