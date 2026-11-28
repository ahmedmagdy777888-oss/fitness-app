/* Wa Uddu service worker: network-first for pages, cache-first for static assets. */
const C='wa-v8';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(k=>k.put(e.request,c));return r})
      .catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    if(r.ok){const c=r.clone();caches.open(C).then(k=>k.put(e.request,c))}
    return r;
  })));
});
