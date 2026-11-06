// Lightweight click tracker: batches clicks on interactive elements and sends them to /api/track.
(() => {
  const ENDPOINT = '/api/track';
  const DATA_KEYS = ['screen', 'world', 'mission', 'avatar', 'choice', 'move', 'dir', 'node', 'edge'];
  let queue = [];

  let sessionId = '';
  try {
    sessionId = sessionStorage.getItem('cq-session') || '';
    if (!sessionId) {
      sessionId = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random().toString(36).slice(2);
      sessionStorage.setItem('cq-session', sessionId);
    }
  } catch (_) { /* storage unavailable */ }

  const describe = (el) => {
    if (el.id) return '#' + el.id;
    for (const key of DATA_KEYS) {
      const v = el.dataset && el.dataset[key];
      if (v !== undefined) return key + ':' + v;
    }
    if (el.tagName === 'CANVAS') return 'game-canvas';
    const cls = (el.className && typeof el.className === 'string') ? el.className.trim().split(/\s+/)[0] : '';
    return el.tagName.toLowerCase() + (cls ? '.' + cls : '');
  };

  const labelOf = (el) =>
    (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || '')
      .replace(/\s+/g, ' ').trim().slice(0, 80);

  const screenOf = (el) => {
    const host = el.closest('.screen, .modal-backdrop, .complete-overlay, header');
    if (!host) return '';
    return (host.id || host.tagName.toLowerCase()).replace(/-screen$/, '');
  };

  document.addEventListener('click', (ev) => {
    const el = ev.target instanceof Element &&
      ev.target.closest('button, a, [role="button"], [data-mission], [data-world], [data-choice], [data-node], canvas, input[type="checkbox"], input[type="radio"]');
    if (!el) return;
    queue.push({ target: describe(el), label: labelOf(el), screen: screenOf(el) });
    if (queue.length >= 20) flush();
  }, true);

  function flush() {
    if (!queue.length) return;
    const payload = JSON.stringify({ sessionId, path: location.pathname, events: queue.splice(0, 50) });
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }))) return;
    fetch(ENDPOINT, { method: 'POST', body: payload, keepalive: true, headers: { 'content-type': 'application/json' } }).catch(() => {});
  }

  setInterval(flush, 5000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
  window.addEventListener('pagehide', flush);
})();
