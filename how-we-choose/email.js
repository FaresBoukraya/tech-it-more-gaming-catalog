document.getElementById('email-link').addEventListener('click', function(e) {
  e.preventDefault(); // Prevents the page from jumping to top
  
  // Assembled dynamically to protect your address from web scrapers
  const user = "techitmore.contact";
  const domain = "gmail.com";
  const subject = encodeURIComponent("Inquiry from Website");
  const body = encodeURIComponent("Hello,\n\nI would like to get in touch with TechItMore.");
  
  // Opens the user's default email client
  window.location.href = `mailto:${user}@${domain}?subject=${subject}&body=${body}`;
});