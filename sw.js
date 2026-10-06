// Service worker: guarda a "casca" do app para abrir rápido e funcionar a tela offline.
// Os dados vêm sempre do servidor (Apps Script); aqui não se guarda nenhum dado de pedido, cliente ou PIN.
var CACHE = 'feira-v1';
var ARQUIVOS = ['./', 'index.html', 'encomendas.html', 'fornecedor.html', 'coordenacao.html', 'gerente.html',
  'css/estilo.css', 'js/config.js', 'js/api.js', 'js/pwa.js',
  'manifest-encomendas.webmanifest', 'manifest-fornecedor.webmanifest', 'manifest-coordenacao.webmanifest', 'manifest-gerente.webmanifest'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
    .then(function () { return self.clients.claim(); }));
});
// rede primeiro (para receber atualizações); se estiver sem internet, usa o que está guardado
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(function (res) {
    var cp = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, cp); }); return res;
  }).catch(function () { return caches.match(req).then(function (r) { return r || caches.match('index.html'); }); }));
});
