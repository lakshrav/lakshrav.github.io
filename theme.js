// Apply saved theme right away (avoids a flash of the wrong theme)
(function () {
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch (e) {}
})();

function currentTheme() {
  var set = document.documentElement.getAttribute("data-theme");
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  // The button shows a sun in dark mode and a moon in light mode
  function update() {
    var theme = currentTheme();
    btn.setAttribute("data-current", theme);
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  btn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    update();
  });

  update();
});

// Footer: show the year the site was last updated.
// On GitHub Pages this is the date of your latest push/deploy.
document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("year-updated");
  if (!el) return;
  var d = new Date(document.lastModified);
  if (!isNaN(d.getTime())) el.textContent = d.getFullYear();
});
