import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve('dist');
const port = Number(process.env.PORT || 5187);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.xml':'application/xml'};
createServer(async(req,res)=>{
  try {
    let path = decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/Sec-Notes(?=\/|$)/,'');
    let file = resolve(root, '.' + path);
    if (file !== root && !file.startsWith(root+'/')) {res.writeHead(403);res.end();return;}
    if ((await stat(file)).isDirectory()) file += '/index.html';
    res.writeHead(200, {'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});
    res.end(await readFile(file));
  } catch {res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(root+'/404.html'));}
}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}/Sec-Notes/`));
