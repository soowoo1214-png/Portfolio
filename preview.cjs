// 선택 사항: Node.js가 있을 때 `node preview.cjs`로 실행합니다.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = __dirname;
const mime = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".webm":"video/webm",".mp4":"video/mp4",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".ico":"image/x-icon"};
http.createServer((req,res)=>{
  let file;
  try { file=path.resolve(root,"."+decodeURIComponent(new URL(req.url,"http://localhost").pathname)); } catch { res.writeHead(400).end();return; }
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(file===root||file.endsWith(path.sep))file=path.join(file,"index.html");
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end("Not found");return;}
  const size=fs.statSync(file).size;
  const headers={"Content-Type":mime[path.extname(file)]||"application/octet-stream","Accept-Ranges":"bytes","Cache-Control":"no-cache"};
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=Math.min(range[2]?Number(range[2]):size-1,size-1);if(start>end||start>=size){res.writeHead(416,{"Content-Range":`bytes */${size}`}).end();return;}res.writeHead(206,{...headers,"Content-Range":`bytes ${start}-${end}/${size}`,"Content-Length":end-start+1});fs.createReadStream(file,{start,end}).pipe(res);}
  else{res.writeHead(200,{...headers,"Content-Length":size});fs.createReadStream(file).pipe(res);}
}).listen(Number(process.env.PORT)||5173,"127.0.0.1",()=>console.log(`HSJ preview: http://127.0.0.1:${Number(process.env.PORT)||5173}`));
