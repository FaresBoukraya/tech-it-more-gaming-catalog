document.querySelectorAll(".social-email").forEach(link => {
  link.addEventListener("click", event => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    event.preventDefault();
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=techitmore.contact@gmail.com&su=Tech%20It%20More%20Gaming%20Catalog",
      "_blank",
      "noopener,noreferrer"
    );
  });
});