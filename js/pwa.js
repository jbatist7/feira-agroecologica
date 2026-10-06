// Registra o service worker e oferece a instalação do app na tela inicial.
(function () {
  if ('serviceWorker' in navigator) window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone;
  if (standalone) return;
  var evt = null, ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  function barra(texto, comBotao) {
    if (document.getElementById('barraInstalar') || sessionStorage.getItem('instalar_fechado')) return;
    var d = document.createElement('div'); d.id = 'barraInstalar'; d.className = 'instalar';
    d.innerHTML = '<span>' + texto + '</span>' + (comBotao ? '<button id="btnInstalar">Instalar</button>' : '') + '<button class="sec" id="btnFechar">×</button>';
    document.body.appendChild(d);
    document.getElementById('btnFechar').onclick = function () { d.remove(); try { sessionStorage.setItem('instalar_fechado', '1'); } catch (e) {} };
    var b = document.getElementById('btnInstalar');
    if (b) b.onclick = function () { if (evt) { evt.prompt(); evt.userChoice.then(function () { evt = null; d.remove(); }); } };
  }
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); evt = e; barra('Instale este app na tela inicial do celular.', true); });
  if (ios) window.addEventListener('load', function () { barra('Para instalar: toque em Compartilhar e depois em "Adicionar à Tela de Início".', false); });
})();
