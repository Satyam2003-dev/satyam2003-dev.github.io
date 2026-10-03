import './prepare-content.mjs';
import {build} from 'vite';
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

await build();
await build({build:{ssr:resolve('src/entry-server.jsx')}});
const {render}=await import(pathToFileURL(resolve('.build-ssr/entry-server.js')));
const template=await readFile('dist/index.html','utf8');
const posts=JSON.parse(await readFile('src/generated/posts.json','utf8'));
const origin='https://satyam2003-dev.github.io';
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routes=[
 {path:'/',title:'Satyam Kumar — cybersecurity, cloud & DevSecOps',description:'A public notebook on cybersecurity, DevSecOps, cloud infrastructure, and AI security.'},
 {path:'/blog/',title:'Blog — learning in public',description:'Learning journals on cybersecurity, DevSecOps, and the systems behind the tools.'},
 {path:'/articles/',title:'Articles — ideas worth understanding',description:'Detailed technical references on secure delivery, infrastructure, and cybersecurity.'},
 {path:'/notes/',title:'Notes — the notebook begins',description:'Short cybersecurity references. This collection is intentionally starting empty.'},
 {path:'/about/',title:'About Satyam Kumar',description:'DevSecOps experience, hands-on cybersecurity learning, and AI & Cybersecurity studies at IIT Patna.'},
 ...posts.map(post=>({path:`/${post.type==='blog'?'blog':'articles'}/${post.slug}/`,title:post.title,description:post.description,type:'article'})),
];
function page(route){
 const title=`${route.title} · sec.notes`;
 const meta=`<meta name="description" content="${escape(route.description)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(route.description)}"><meta property="og:type" content="${route.type||'website'}"><meta property="og:url" content="${origin}${route.path}"><link rel="canonical" href="${origin}${route.path}">`;
 return template.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace('<!--page-meta-->',meta).replace('<!--app-html-->',render(route.path));
}
for(const route of routes){
 const directory=resolve('dist','.'+route.path);
 await mkdir(directory,{recursive:true});
 await writeFile(resolve(directory,'index.html'),page(route));
}
await writeFile('dist/404.html',page({path:'/404/',title:'Page not found',description:'Return to the sec.notes notebook.'}));
await writeFile('dist/.nojekyll','');
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>${origin}${route.path}</loc></url>`).join('')}</urlset>`);
await rm('.build-ssr',{recursive:true,force:true});
console.log(`Prerendered ${routes.length} routes and a custom 404 into dist/.`);
