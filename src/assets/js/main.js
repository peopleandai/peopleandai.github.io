// PANDA Lab — 언어 전환, 모바일 메뉴, 논문 필터
(function () {
  var root = document.documentElement;

  // ── 언어 전환 (KO / EN) ──
  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-set-lang");
      root.setAttribute("data-lang", lang);
      root.setAttribute("lang", lang);
      try { localStorage.setItem("panda-lang", lang); } catch (e) {}
    });
  });

  // ── 모바일 메뉴 ──
  var menuBtn = document.querySelector("[data-menu-btn]");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    menuBtn.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 960) setOpen(false); });
  }

  // ── 스크롤 시 헤더 그림자 ──
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ── 논문 주제 필터 ──
  var filters = document.querySelectorAll("[data-filter]");
  if (filters.length) {
    var apply = function (topic) {
      filters.forEach(function (f) { f.setAttribute("aria-pressed", f.getAttribute("data-filter") === topic ? "true" : "false"); });
      document.querySelectorAll(".year-group").forEach(function (group) {
        var visible = 0;
        group.querySelectorAll(".pub").forEach(function (p) {
          var topics = (p.getAttribute("data-topics") || "").split(" ");
          var show = topic === "all" || topics.indexOf(topic) !== -1;
          p.hidden = !show;
          if (show) visible++;
        });
        group.hidden = visible === 0;
      });
    };
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        var t = f.getAttribute("data-filter");
        apply(t);
        try { history.replaceState(null, "", t === "all" ? location.pathname : "#topic=" + t); } catch (e) {}
      });
    });
    var m = location.hash.match(/topic=([\w-]+)/);
    if (m && document.querySelector('[data-filter="' + m[1] + '"]')) apply(m[1]);
  }
})();
