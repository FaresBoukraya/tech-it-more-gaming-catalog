/* Applies the saved theme before first paint so pages do not flash the wrong colors,
   and swaps in a generic illustration when a product photo fails to load. */
(function () {
  var theme = null;
  try { theme = JSON.parse(localStorage.getItem('tim:theme')); } catch (e) { /* storage unavailable */ }
  if (theme !== 'dark' && theme !== 'light') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();

document.addEventListener('error', function (event) {
  var img = event.target;
  if (!img || img.tagName !== 'IMG' || !img.dataset.fallback || img.getAttribute('src') === img.dataset.fallback) return;
  img.src = img.dataset.fallback;
  img.classList.add('tm-tile-art');
}, true);

/* Dark-mode button on the static pages (product, category, guide). The home page has its own handler in app.js. */
document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('theme-toggle');
  if (!button || document.querySelector('script[src*="app.js"]')) return;
  var sun = '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>';
  var moon = '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>';
  function paint() {
    var dark = document.documentElement.dataset.theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' mode');
    button.querySelector('.theme-icon').innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (dark ? sun : moon) + '</svg>';
    button.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
    var meta = document.getElementById('theme-color');
    if (meta) meta.content = dark ? '#1a191d' : '#efedf0';
  }
  button.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('tim:theme', JSON.stringify(next)); } catch (e) { /* storage unavailable */ }
    paint();
  });
  paint();
});

/* Saved list and compare on the static pages (product, category, guide). The home page has its own code in app.js.
   Both lists use the same storage as the home page, so they carry over when you go back to browse. */
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('script[src*="app.js"]')) return;
  var MAX = 3;
  function read(store, key) { try { var v = JSON.parse(store.getItem('tim:' + key)); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function write(store, key, list) { try { store.setItem('tim:' + key, JSON.stringify(list)); } catch (e) { /* storage unavailable */ } }
  var saved = read(window.localStorage, 'watchlist');
  var compare = read(window.sessionStorage, 'compare');
  var toast = null, timer = 0;
  function say(message) {
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.appendChild(toast); }
    toast.textContent = message; toast.classList.add('visible');
    clearTimeout(timer); timer = setTimeout(function () { toast.classList.remove('visible'); }, 4000);
  }
  function badge(el, n) { if (!el) return; el.textContent = String(n); if (n) el.removeAttribute('data-zero'); else el.setAttribute('data-zero', ''); }
  function paint() {
    badge(document.getElementById('watchlist-count'), saved.length);
    badge(document.getElementById('menu-saved-count'), saved.length);
    badge(document.getElementById('compare-badge'), compare.length);
    badge(document.getElementById('menu-compare-count'), compare.length);
    document.querySelectorAll('[data-dx-save]').forEach(function (b) {
      var on = saved.indexOf(b.dataset.dxSave) !== -1;
      b.setAttribute('aria-pressed', String(on)); b.querySelector('span').textContent = on ? 'Saved' : 'Save';
    });
    document.querySelectorAll('[data-dx-compare]').forEach(function (b) {
      var on = compare.indexOf(b.dataset.dxCompare) !== -1;
      b.setAttribute('aria-pressed', String(on)); b.querySelector('span').textContent = on ? 'In compare' : 'Add to compare';
    });
  }
  document.addEventListener('click', function (event) {
    var s = event.target.closest('[data-dx-save]');
    if (s) {
      var id = s.dataset.dxSave, at = saved.indexOf(id);
      if (at === -1) { saved.push(id); say('Saved. Your list is under the heart.'); } else { saved.splice(at, 1); say('Removed from your saved list.'); }
      write(window.localStorage, 'watchlist', saved); paint(); return;
    }
    var c = event.target.closest('[data-dx-compare]');
    if (c) {
      var pid = c.dataset.dxCompare, i = compare.indexOf(pid);
      if (i === -1) {
        if (compare.length >= MAX) { say('You can compare up to ' + MAX + ' products at a time.'); return; }
        compare.push(pid);
        say(compare.length < 2 ? 'Added. Pick one more product to compare.' : 'Added. Open Compare to see them side by side.');
      } else { compare.splice(i, 1); say('Removed from compare.'); }
      write(window.sessionStorage, 'compare', compare); paint();
    }
  });
  paint();
});
