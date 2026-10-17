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
