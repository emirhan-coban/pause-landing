(function () {
  var TITLES = {
    tr: "Pause — Sosyal anksiyete için yapay zekâ destekli mobil uygulama",
    en: "Pause — AI-assisted mobile app for social anxiety"
  };
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".lang button");

  function setLang(l) {
    root.lang = l;
    document.title = TITLES[l];
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === l));
    });
    try { localStorage.setItem("pause-lang", l); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem("pause-lang"); } catch (e) {}
  var initial = saved || ((navigator.language || "tr").toLowerCase().indexOf("tr") === 0 ? "tr" : "en");
  setLang(initial);

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.set); });
  });

  // animate result bars when they scroll into view
  var bars = document.querySelectorAll(".bar");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { io.observe(b); });
  } else {
    bars.forEach(function (b) { b.classList.add("in"); });
  }
})();
