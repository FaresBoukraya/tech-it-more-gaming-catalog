/*
  Email links, on every page.

  The links are plain mailto: links, so they work with no script at all.
  A mailto: link only works where a mail app is set up, which is normal on a phone and
  rare on a computer. So on a computer this file opens a small "Email us" card with:
    - Gmail, Outlook and Yahoo (a new tab, with the subject and message already filled in)
    - "Mail app on this device" (the normal mailto: link, for people who do have one)
    - Copy address
  On a phone or tablet nothing changes: the link opens the mail app directly. If that
  ever opens nothing, the address is copied and a short note says so.
*/
(function () {
  var toast, toastTimer, menu, backdrop, lastFocus;

  var isTouchDevice = (function () {
    var ua = navigator.userAgent || "";
    if (/Android|iPhone|iPad|iPod|Mobile|Silk|Windows Phone/i.test(ua)) return true;
    if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true; /* iPadOS */
    return !!(window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  })();

  function say(text) {
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "tm-mail-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("visible"); }, 6000);
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var box = document.createElement("textarea");
      box.value = text;
      box.setAttribute("readonly", "");
      box.className = "sr-only";
      document.body.appendChild(box);
      box.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      box.remove();
      ok ? resolve() : reject(new Error("copy failed"));
    });
  }

  function parse(href) {
    var rest = href.slice(7);
    var cut = rest.indexOf("?");
    var address = decodeURIComponent(cut === -1 ? rest : rest.slice(0, cut));
    var params = new URLSearchParams(cut === -1 ? "" : rest.slice(cut + 1));
    return { address: address, subject: params.get("subject") || "", body: params.get("body") || "" };
  }

  function providers(m) {
    var q = encodeURIComponent;
    return [
      { name: "Gmail", url: "https://mail.google.com/mail/?view=cm&fs=1&to=" + q(m.address) + "&su=" + q(m.subject) + "&body=" + q(m.body) },
      { name: "Outlook", url: "https://outlook.live.com/mail/0/deeplink/compose?to=" + q(m.address) + "&subject=" + q(m.subject) + "&body=" + q(m.body) },
      { name: "Yahoo Mail", url: "https://compose.mail.yahoo.com/?to=" + q(m.address) + "&subject=" + q(m.subject) + "&body=" + q(m.body) }
    ];
  }

  function closeMenu() {
    if (!menu) return;
    menu.remove(); backdrop.remove();
    menu = backdrop = null;
    document.removeEventListener("keydown", onKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(event) {
    if (!menu) return;
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); closeMenu(); return; }
    if (event.key !== "Tab") return;
    var items = menu.querySelectorAll("a, button");
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function openMenu(link, m) {
    closeMenu();
    lastFocus = link;

    backdrop = document.createElement("div");
    backdrop.className = "tm-mail-backdrop";
    backdrop.addEventListener("click", closeMenu);

    menu = document.createElement("div");
    menu.className = "tm-mail-menu";
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-modal", "true");
    menu.setAttribute("aria-label", "Email us");

    var head = document.createElement("div");
    head.className = "tm-mail-menu-head";
    var title = document.createElement("strong");
    title.textContent = "Email us";
    var close = document.createElement("button");
    close.type = "button";
    close.className = "tm-mail-menu-close";
    close.setAttribute("aria-label", "Close");
    close.textContent = "×";
    close.addEventListener("click", closeMenu);
    head.appendChild(title); head.appendChild(close);

    var addr = document.createElement("p");
    addr.className = "tm-mail-menu-addr";
    addr.textContent = m.address;

    var list = document.createElement("div");
    list.className = "tm-mail-menu-list";
    providers(m).forEach(function (p) {
      var a = document.createElement("a");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Open in " + p.name;
      a.addEventListener("click", function () { setTimeout(closeMenu, 0); });
      list.appendChild(a);
    });

    var app = document.createElement("a");
    app.href = link.getAttribute("href");
    app.textContent = "Mail app on this device";
    app.addEventListener("click", function () { setTimeout(closeMenu, 0); });
    list.appendChild(app);

    var copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.textContent = "Copy address";
    copyBtn.addEventListener("click", function () {
      copy(m.address).then(
        function () { copyBtn.textContent = "Copied"; },
        function () { copyBtn.textContent = "Select the address above"; }
      );
    });
    list.appendChild(copyBtn);

    menu.appendChild(head); menu.appendChild(addr); menu.appendChild(list);
    document.body.appendChild(backdrop);
    document.body.appendChild(menu);
    document.addEventListener("keydown", onKey, true);
    list.querySelector("a").focus();
  }

  /* Safety net for the plain mailto: link: if it opens nothing, copy the address and say so. */
  function safetyNet(address) {
    var left = false;
    function mark() { left = true; }
    window.addEventListener("blur", mark, { once: true });
    document.addEventListener("visibilitychange", mark, { once: true });
    setTimeout(function () {
      window.removeEventListener("blur", mark);
      document.removeEventListener("visibilitychange", mark);
      if (left) return;
      copy(address).then(
        function () { say("If your mail app didn't open, we copied our address: " + address); },
        function () { say("If your mail app didn't open, write to us at " + address); }
      );
    }, 1500);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest('a[href^="mailto:"]');
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    var m = parse(link.getAttribute("href"));
    if (!m.address) return;

    if (isTouchDevice || (menu && menu.contains(link))) { safetyNet(m.address); return; }
    event.preventDefault();
    openMenu(link, m);
  });
})();
