/* Top bar menu, search button and the language / theme controls on phones.
   Runs on every page. On phones the language picker and the theme button live inside the menu panel; on larger screens
   they sit in the header, so this file moves the same elements back and forth (their listeners and ids stay intact). */
(function () {
  'use strict';
  var header = document.querySelector('.tm-header');
  var menu = document.getElementById('site-menu');
  var menuButton = document.getElementById('menu-toggle');
  var searchButton = document.getElementById('search-toggle');
  var backdrop = document.querySelector('.tm-menu-backdrop');
  var controls = document.getElementById('menu-controls');
  if (!header || !menu || !menuButton) return;
  var phone = window.matchMedia('(max-width: 760px)');
  var hasApp = !!document.querySelector('script[src*="app.js"]');

  /* Move the language picker and theme button into the menu on phones, and back on larger screens. */
  function placeControls() {
    var language = document.querySelector('.tm-language');
    var theme = document.getElementById('theme-toggle');
    var actions = header.querySelector('.tm-actions');
    if (!actions || !controls) return;
    if (phone.matches) {
      if (language && language.parentNode !== controls) controls.appendChild(language);
      if (theme && theme.parentNode !== controls) controls.appendChild(theme);
    } else {
      var nav = actions.querySelector('.tm-nav');
      if (language && language.parentNode !== actions) actions.insertBefore(language, nav ? nav.nextSibling : actions.firstChild);
      if (theme && theme.parentNode !== actions) actions.appendChild(theme);
      closeMenu();
    }
  }

  function isOpen() { return !menu.hidden; }
  function openMenu() {
    if (!phone.matches) return;
    closeSearch();
    menu.hidden = false;
    if (backdrop) backdrop.hidden = false;
    header.classList.add('tm-menu-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close menu');
  }
  function closeMenu(returnFocus) {
    if (menu.hidden) return;
    menu.hidden = true;
    if (backdrop) backdrop.hidden = true;
    header.classList.remove('tm-menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    if (returnFocus) menuButton.focus();
  }

  /* Search: the field is tucked away on phones and slides open under the bar. */
  function openSearch() {
    if (!phone.matches) return;
    closeMenu();
    header.classList.add('tm-search-open');
    if (searchButton) searchButton.setAttribute('aria-expanded', 'true');
  }
  function closeSearch() {
    header.classList.remove('tm-search-open');
    if (searchButton) searchButton.setAttribute('aria-expanded', 'false');
  }
  function searchField() { return header.querySelector('.tm-search input'); }

  window.addEventListener('tm:search-open', openSearch);
  menuButton.addEventListener('click', function () { if (isOpen()) closeMenu(); else openMenu(); });
  if (searchButton) {
    searchButton.addEventListener('click', function () {
      if (header.classList.contains('tm-search-open') && !(searchField() && searchField().value)) { closeSearch(); return; }
      openSearch();
      var input = searchField();
      if (input) input.focus({ preventScroll: true });
    });
  }
  header.addEventListener('focusin', function (event) {
    if (event.target === searchField()) { if (phone.matches) header.classList.add('tm-search-open'); if (searchButton) searchButton.setAttribute('aria-expanded', 'true'); }
  });
  header.addEventListener('focusout', function (event) {
    if (event.target === searchField() && !event.target.value) {
      window.setTimeout(function () { if (!header.contains(document.activeElement)) closeSearch(); }, 120);
    }
  });

  /* Close the menu on Escape, on a tap outside, after choosing an item, and when the screen grows. */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) { event.preventDefault(); closeMenu(true); }
  });
  if (backdrop) backdrop.addEventListener('click', function () { closeMenu(); });
  menu.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;
    if (link.dataset.menu === 'browse' && hasApp) {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent('tm:browse'));
    }
    closeMenu();
  });
  window.addEventListener('hashchange', function () { closeMenu(); });
  window.addEventListener('pageshow', function () { closeMenu(); });
  (phone.addEventListener ? phone.addEventListener.bind(phone, 'change') : phone.addListener.bind(phone))(placeControls);

  /* Shadow under the bar once the page has scrolled. */
  function pin() { header.classList.toggle('tm-header-pinned', phone.matches && window.scrollY > 8); }
  window.addEventListener('scroll', pin, { passive: true });
  pin();
  placeControls();
})();
