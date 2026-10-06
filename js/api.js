// Chama uma função do servidor (Apps Script) e devolve uma Promise. Mesma forma de uso das telas anteriores.
function api(nome) {
  var args = Array.prototype.slice.call(arguments, 1);
  var ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  var t = ctl ? setTimeout(function () { ctl.abort(); }, 60000) : null;
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },   // evita pré-verificação (CORS) do navegador
    body: JSON.stringify({ fn: nome, args: args }),
    signal: ctl ? ctl.signal : undefined
  }).then(function (r) {
    if (t) clearTimeout(t);
    if (!r.ok) throw new Error('Servidor indisponível (' + r.status + '). Tente de novo.');
    return r.json();
  }).then(function (j) {
    if (!j.ok) throw new Error(j.erro || 'Erro desconhecido.');
    return j.dados;
  }).catch(function (e) {
    if (t) clearTimeout(t);
    if (e && e.name === 'AbortError') throw new Error('O servidor demorou demais. Tente de novo.');
    if (e instanceof TypeError) throw new Error('Sem conexão com a internet. Tente de novo.');
    if (e instanceof SyntaxError) throw new Error('Resposta inválida do servidor. Confira a implantação do Apps Script.');
    throw e;
  });
}
function $(id) { return document.getElementById(id); }
function esc(s) { return String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function brl(n) { return 'R$ ' + (Math.round(Number(n) * 100) / 100).toFixed(2).replace('.', ','); }
function qtdTxt(n) { return String(Math.round(Number(n) * 1000) / 1000).replace('.', ','); }
function lerNum(v) { var n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? 0 : n; }
function msg(id, texto, tipo) { $(id).innerHTML = texto ? '<div class="msg ' + (tipo || 'info') + '">' + esc(texto) + '</div>' : ''; }
function ocupado(btn, sim) { btn.disabled = sim; }
