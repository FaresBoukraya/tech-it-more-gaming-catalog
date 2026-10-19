/*
  Email links, on every page.

  The links themselves are plain mailto: links, so they work with no script at all.
  This file only adds a safety net: if clicking one opens nothing (a computer with no
  mail app set up is the usual reason), it copies our address and says so, so the click
  is never a dead end. On a phone, or wherever a mail app does open, nothing extra happens.
*/
(function () {
  var toast, timer;

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
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove("visible"); }, 6000);
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

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest('a[href^="mailto:"]');
    if (!link || event.defaultPrevented || event.button !== 0) return;
    var address = decodeURIComponent(link.getAttribute("href").slice(7).split("?")[0]);
    if (!address) return;

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
  });
})();
