export const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#faf9f6">
  <title>Quad Trees | Kshitij Mishra</title>
  <meta name="description" content="An interactive introduction to quad trees and spatial partitioning.">
  <style>
    :root { --paper:#faf9f6;--ink:#24231f;--muted:#77736b;--line:#d8d4cb;--soft:#efede7;--accent:#d95d39;--code:#252722 }
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);background:var(--paper);font-family:Georgia,"Times New Roman",serif;font-size:19px;line-height:1.75;-webkit-font-smoothing:antialiased}
    a{color:inherit;text-decoration-color:#aaa59b;text-underline-offset:4px}a:hover{color:var(--accent);text-decoration-color:var(--accent)}
    .site-header{width:min(1120px,calc(100% - 40px));margin:0 auto;height:104px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);font:13px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
    .brand{font-weight:700;letter-spacing:.02em;text-decoration:none}.brand-mark{color:var(--accent)}nav{display:flex;align-items:center;gap:26px}nav a{text-decoration:none;color:var(--muted)}nav a.active{color:var(--ink)}
    .article{width:min(720px,calc(100% - 40px));margin:92px auto 120px}.kicker{margin:0 0 18px;color:var(--accent);font:700 12px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.12em;text-transform:uppercase}
    h1{max-width:680px;margin:0;font-size:clamp(42px,7vw,72px);line-height:1.03;letter-spacing:0;font-weight:500}.dek{margin:28px 0 20px;max-width:620px;color:#555149;font-size:22px;line-height:1.55}
    .meta{display:flex;align-items:center;gap:10px;color:var(--muted);font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.meta i{width:3px;height:3px;border-radius:50%;background:#a5a096}.hero-rule{margin:52px 0 64px;border:0;border-top:1px solid var(--line)}
    p{margin:0 0 1.45em}.lead::first-letter{float:left;padding:10px 10px 0 0;color:var(--accent);font-size:76px;line-height:.68}h2{margin:2.2em 0 .75em;font-size:34px;line-height:1.2;font-weight:500}h3{margin:2em 0 .6em;font-size:24px;line-height:1.3;font-weight:600}
    code{padding:.12em .32em;border-radius:3px;background:var(--soft);font:.82em ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}pre{overflow-x:auto;margin:32px calc((min(920px,100vw - 40px) - 100%)/-2);padding:28px 32px;border-radius:6px;color:#e8e8df;background:var(--code);font:14px/1.65 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}pre code{padding:0;background:transparent;font:inherit}.kw{color:#e88e69}.ty{color:#a6c993}
    .figure{width:min(920px,calc(100vw - 40px));margin:48px 50%;transform:translateX(-50%)}.demo-shell{border:1px solid #c9c5bb;border-radius:6px;background:#fdfcf9;overflow:hidden}.demo-bar{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:58px;padding:10px 14px 10px 18px;border-bottom:1px solid var(--line);font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
    .demo-title{display:flex;align-items:center;gap:9px;font-weight:700}.live-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px #f3dcd4}.controls{display:flex;align-items:center;gap:7px}button{appearance:none;border:1px solid #c7c2b8;border-radius:4px;padding:7px 10px;color:var(--ink);background:#fff;cursor:pointer;font:inherit}button:hover{border-color:var(--ink)}button.primary{border-color:var(--ink);color:#fff;background:var(--ink)}
    .capacity{display:flex;align-items:center;gap:7px;color:var(--muted)}select{border:1px solid #c7c2b8;border-radius:4px;padding:6px 26px 6px 8px;color:var(--ink);background:#fff;font:inherit}.canvas-wrap{position:relative;aspect-ratio:16/9;min-height:320px}canvas{display:block;width:100%;height:100%;cursor:crosshair;touch-action:none}.canvas-hint{position:absolute;right:12px;bottom:10px;pointer-events:none;color:#89847a;font:11px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
    figcaption{margin-top:12px;color:var(--muted);text-align:center;font-size:14px;font-style:italic}blockquote{margin:36px 0;padding:3px 0 3px 24px;border-left:3px solid var(--accent);color:#4f4b44;font-size:22px;font-style:italic}
    .tree-diagram{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center;padding:32px;border:1px solid var(--line);border-radius:6px;background:#fdfcf9}.quad-box{position:relative;aspect-ratio:1;border:2px solid var(--ink)}.quad-box::before,.quad-box::after{content:"";position:absolute;background:var(--ink)}.quad-box::before{top:0;bottom:0;left:50%;width:1px}.quad-box::after{left:0;right:0;top:50%;height:1px}
    .quad-label{position:absolute;z-index:1;color:var(--muted);font:11px ui-monospace,monospace}.nw{top:10px;left:12px}.ne{top:10px;right:12px}.sw{bottom:10px;left:12px}.se{right:12px;bottom:10px}.tree{font:13px/1.65 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--muted);white-space:pre}.tree b{color:var(--accent)}
    .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:60px;padding-top:26px;border-top:1px solid var(--line)}.tag{padding:5px 9px;border:1px solid var(--line);border-radius:3px;color:var(--muted);font:11px ui-monospace,monospace}.article-footer{width:min(1120px,calc(100% - 40px));margin:0 auto;padding:36px 0 44px;border-top:1px solid var(--line);color:var(--muted);font:12px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:flex;justify-content:space-between}
    @media(max-width:700px){body{font-size:17px}.site-header{height:78px}nav{gap:15px}nav a:nth-child(2){display:none}.article{margin-top:58px}h1{font-size:45px}.dek{font-size:19px}.demo-bar{align-items:flex-start;flex-direction:column}.controls{width:100%;flex-wrap:wrap}.controls button{flex:1}.canvas-wrap{min-height:360px;aspect-ratio:4/5}.tree-diagram{grid-template-columns:1fr}pre{padding:22px 20px}.article-footer{gap:20px;flex-direction:column}}
  </style>
</head>
<body>
  <header class="site-header"><a class="brand" href="/"><span class="brand-mark">~/</span>kshitij</a><nav aria-label="Main navigation"><a href="#about">about</a><a class="active" href="#writing">writing</a></nav></header>
  <main class="article"><article>
    <header id="writing"><p class="kicker">Data structures / Visualized</p><h1>Introduction to Quad Trees</h1><p class="dek">A visual guide to dividing two-dimensional space, and why doing less work often begins with drawing a few more boxes.</p><div class="meta"><span>BY KSHITIJ MISHRA</span><i></i><span>9 MIN READ</span></div></header>
    <hr class="hero-rule">
    <p class="lead">Imagine a two-dimensional game with hundreds of objects moving at once. To detect a collision, the straightforward approach compares every object with every other object. It works, but the amount of work grows very quickly.</p>
    <p>A quad tree gives us a better question: instead of asking which objects might collide everywhere, can we first narrow the search to a small region of space?</p>
    <h2>Divide and locate</h2><p>A quad tree recursively partitions a rectangular area into four quadrants. Each node represents a region. Once that region contains more objects than its capacity allows, it splits into north-west, north-east, south-west, and south-east children.</p>
    <figure class="figure"><div class="tree-diagram"><div class="quad-box" aria-label="A square divided into four quadrants"><span class="quad-label nw">NW</span><span class="quad-label ne">NE</span><span class="quad-label sw">SW</span><span class="quad-label se">SE</span></div><div class="tree"><b>root</b>
 |-- north-west
 |-- north-east
 |-- south-west
 \`-- south-east</div></div><figcaption>The spatial partition on the left maps directly to the tree on the right.</figcaption></figure>
    <p>Now try it. Every click inserts a point. When a region exceeds its capacity, it divides. Dense areas develop fine-grained partitions while empty areas remain untouched.</p>
    <figure class="figure"><div class="demo-shell"><div class="demo-bar"><div class="demo-title"><span class="live-dot"></span>QUAD TREE PLAYGROUND</div><div class="controls"><label class="capacity">capacity <select id="capacity" aria-label="Node capacity"><option>1</option><option selected>4</option><option>8</option></select></label><button id="random" type="button">+ 25 random</button><button id="clear" type="button">clear</button><button class="primary" id="animate" type="button">scatter</button></div></div><div class="canvas-wrap"><canvas id="quadtree" aria-label="Interactive quadtree visualization"></canvas><span class="canvas-hint">click or drag to add points</span></div></div><figcaption id="stats">0 points, 1 region</figcaption></figure>
    <blockquote>The structure adapts to the data. More detail appears only where more detail is useful.</blockquote>
    <h2>The shape of a node</h2><p>Each node needs only a boundary, a capacity, the points it currently owns, and references to four children after subdivision.</p>
    <pre><code><span class="kw">class</span> <span class="ty">QuadTree</span> {
  boundary: Rectangle
  capacity: number
  points: Point[]
  children?: QuadTree[]

  insert(point: Point): boolean
  subdivide(): void
  query(range: Rectangle): Point[]
}</code></pre>
    <h3>Insertion</h3><p>Insertion first checks whether the point belongs inside the current boundary. If the node has room, it stores the point. Otherwise it subdivides and hands the point to the appropriate child.</p>
    <pre><code>insert(point) {
  <span class="kw">if</span> (!this.boundary.contains(point)) <span class="kw">return false</span>
  <span class="kw">if</span> (this.points.length &lt; this.capacity) {
    this.points.push(point)
    <span class="kw">return true</span>
  }
  <span class="kw">if</span> (!this.children) this.subdivide()
  <span class="kw">return</span> this.children.some(child =&gt; child.insert(point))
}</code></pre>
    <h2>Why it helps</h2><p>For a range query, we can ignore every node whose boundary does not intersect the requested area. A well-distributed tree turns a broad scan into a short walk through only the relevant branches.</p><p>That idea shows up in collision detection, maps, image compression, particle simulations, and nearest-neighbour search. Different applications tune the stopping rule, but the recursive structure remains pleasantly small.</p>
    <div class="tags"><span class="tag">algorithms</span><span class="tag">data-structures</span><span class="tag">typescript</span><span class="tag">visualization</span></div>
  </article></main>
  <footer class="article-footer" id="about"><span>Kshitij Mishra</span><span>Built with curiosity and plain JavaScript.</span></footer>
  <script>
    const canvas=document.querySelector("#quadtree"),ctx=canvas.getContext("2d"),stats=document.querySelector("#stats"),capacitySelect=document.querySelector("#capacity");let points=[],regions=[],scatterTimer=null;
    function split(x,y,w,h,items,depth,capacity){regions.push({x,y,w,h,depth});if(items.length<=capacity||depth>=8||w<8||h<8)return;const hw=w/2,hh=h/2,b=[[],[],[],[]];for(const p of items){const east=p.x>=x+hw?1:0,south=p.y>=y+hh?2:0;b[east+south].push(p)}split(x,y,hw,hh,b[0],depth+1,capacity);split(x+hw,y,hw,hh,b[1],depth+1,capacity);split(x,y+hh,hw,hh,b[2],depth+1,capacity);split(x+hw,y+hh,hw,hh,b[3],depth+1,capacity)}
    function resize(){const rect=canvas.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);draw()}
    function draw(){const w=canvas.clientWidth,h=canvas.clientHeight;regions=[];split(0,0,w,h,points,0,Number(capacitySelect.value));ctx.clearRect(0,0,w,h);ctx.fillStyle="#fdfcf9";ctx.fillRect(0,0,w,h);for(const r of regions){if(!r.depth)continue;ctx.strokeStyle=r.depth<3?"rgba(36,35,31,.48)":"rgba(36,35,31,.24)";ctx.lineWidth=r.depth<2?1.2:.8;ctx.strokeRect(r.x+.5,r.y+.5,r.w-1,r.h-1)}for(const p of points){ctx.beginPath();ctx.arc(p.x,p.y,3.3,0,Math.PI*2);ctx.fillStyle="#d95d39";ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,7,0,Math.PI*2);ctx.strokeStyle="rgba(217,93,57,.18)";ctx.stroke()}stats.textContent=points.length+(points.length===1?" point, ":" points, ")+regions.length+(regions.length===1?" region":" regions")}
    function addAt(e){const r=canvas.getBoundingClientRect();points.push({x:e.clientX-r.left,y:e.clientY-r.top});draw()}let dragging=false;canvas.addEventListener("pointerdown",e=>{dragging=true;canvas.setPointerCapture(e.pointerId);addAt(e)});canvas.addEventListener("pointermove",e=>{if(!dragging)return;const last=points[points.length-1],r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;if(!last||Math.hypot(last.x-x,last.y-y)>12){points.push({x,y});draw()}});canvas.addEventListener("pointerup",()=>dragging=false);canvas.addEventListener("pointercancel",()=>dragging=false);
    document.querySelector("#random").addEventListener("click",()=>{for(let i=0;i<25;i++)points.push({x:12+Math.random()*(canvas.clientWidth-24),y:12+Math.random()*(canvas.clientHeight-24)});draw()});document.querySelector("#clear").addEventListener("click",()=>{clearInterval(scatterTimer);scatterTimer=null;points=[];draw();document.querySelector("#animate").textContent="scatter"});document.querySelector("#animate").addEventListener("click",e=>{if(scatterTimer){clearInterval(scatterTimer);scatterTimer=null;e.currentTarget.textContent="scatter";return}e.currentTarget.textContent="pause";scatterTimer=setInterval(()=>{if(points.length>=180){clearInterval(scatterTimer);scatterTimer=null;e.currentTarget.textContent="scatter";return}points.push({x:12+Math.random()*(canvas.clientWidth-24),y:12+Math.random()*(canvas.clientHeight-24)});draw()},90)});capacitySelect.addEventListener("change",draw);new ResizeObserver(resize).observe(canvas);resize();
  </script>
</body>
</html>`;
export default{async fetch(request,env,ctx){void env;void ctx;const path=new URL(request.url).pathname;if(path!=="/"&&path!=="/blog/quadtrees")return new Response("Not found",{status:404});return new Response(page,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"public, max-age=300"}})}};
