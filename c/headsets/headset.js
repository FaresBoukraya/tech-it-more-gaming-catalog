(function () {
  "use strict";

  function gmailUrl(mailto) {
    var url = new URL(mailto);
    var params = new URLSearchParams(url.search);
    var gmail = new URLSearchParams({ view: "cm", fs: "1", to: decodeURIComponent(url.pathname) });
    if (params.get("subject")) gmail.set("su", params.get("subject"));
    if (params.get("body")) gmail.set("body", params.get("body"));
    return "https://mail.google.com/mail/?" + gmail.toString();
  }

  function flash(link, text) {
    var old = link.getAttribute("title");
    link.setAttribute("title", text);
    link.classList.add("email-copied");
    setTimeout(function () {
      link.classList.remove("email-copied");
      if (old) link.setAttribute("title", old);
    }, 1800);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest('a[href^="mailto:"]');
    if (!link) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // phones use their mail app

    event.preventDefault();
    var popup = window.open(gmailUrl(link.href), "_blank", "noopener,noreferrer");
    if (popup) return;

    var address = decodeURIComponent(new URL(link.href).pathname);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(
        function () { flash(link, "Email address copied: " + address); },
        function () { window.location.href = link.href; }
      );
    } else {
      window.location.href = link.href;
    }
  });
})();