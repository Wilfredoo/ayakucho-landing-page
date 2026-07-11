/* ============================================================
   Ayakucho landing — vanilla JS, no dependencies.
   Carousel · con mode · suggestions · email capture · video ·
   FAQ · creators.
   ============================================================ */
(function () {
  "use strict";

  function t(key, fallback) {
    return window.AYK ? window.AYK.t(key) : fallback;
  }

  /* -------------------- 1. Hero carousel -------------------- */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector("[data-carousel-track]");
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = root.querySelector("[data-carousel-dots]");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    var index = 0;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "carousel__dot";
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, di) {
        d.setAttribute("aria-selected", di === index ? "true" : "false");
      });
    }

    prev.addEventListener("click", function () { go(index - 1); });
    next.addEventListener("click", function () { go(index + 1); });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(index - 1); }
      if (e.key === "ArrowRight") { go(index + 1); }
    });

    // Slides 2–5 carry data-src so slide 1 gets the whole pipe first.
    // They load once the page is done, or the moment someone interacts.
    function loadDeferredSlides() {
      root.querySelectorAll("img[data-src]").forEach(function (img) {
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
      });
    }
    window.addEventListener("load", loadDeferredSlides, { once: true });
    [prev, next, dotsWrap].forEach(function (el) {
      el.addEventListener("pointerdown", loadDeferredSlides, { once: true });
    });

    var startX = 0, dragging = false;
    var viewport = root.querySelector("[data-carousel-viewport]");
    viewport.addEventListener("touchstart", function (e) {
      loadDeferredSlides();
      startX = e.touches[0].clientX; dragging = true;
    }, { passive: true });
    viewport.addEventListener("touchend", function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); }
    }, { passive: true });

    go(0);
  });

  /* -------------------- 2. Con mode (Brettspiel Berlin) -------------------- */
  // Auto-active on these days (Europe/Berlin). Force with ?con=1 / ?con=0.
  var CON_DAYS = ["2026-07-11", "2026-07-12"];

  function conActive() {
    var qs = new URLSearchParams(window.location.search);
    if (qs.get("con") === "1") return true;
    if (qs.get("con") === "0") return false;
    try {
      var today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
      return CON_DAYS.indexOf(today) !== -1;
    } catch (e) {
      return false;
    }
  }

  var conWrap = document.querySelector("[data-con-wrap]");
  if (conWrap && conActive()) conWrap.hidden = false;

  // Con form: AJAX submit, inline success.
  var conForm = document.querySelector("[data-con-form]");
  var conSuccess = document.querySelector("[data-con-success]");
  if (conForm && conSuccess) {
    conForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new URLSearchParams(new FormData(conForm)).toString();
      function done() {
        conSuccess.hidden = false;
        conForm.reset();
      }
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data
      }).then(done).catch(done);
    });
  }

  /* ---------- 3. "Who shared this?" suggestions with built-in tally ---------- */
  // The endpoint returns [{name, count}] sorted by count desc. The dropdown
  // shows them in that order with counts; the overall #1 gets a gold trophy
  // and #2 a silver medal. Filters as you type; click fills the name.
  var heardInput = document.querySelector("[data-heard-input]");
  var suggestBox = document.querySelector("[data-suggest]");
  var suggestions = [];

  // On localhost there's no functions runtime — use the live endpoint,
  // cache-busted so dev always sees fresh data.
  var isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  var SUGGEST_URL = isLocal
    ? "https://ayakucho.com/.netlify/functions/referrer-suggestions?dev=" + Date.now()
    : "/.netlify/functions/referrer-suggestions";

  fetch(SUGGEST_URL)
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (entries) { suggestions = entries || []; })
    .catch(function () { /* endpoint unreachable — no suggestions */ });

  function renderSuggest() {
    if (!suggestions.length) { suggestBox.hidden = true; return; }
    var q = heardInput.value.trim().toLowerCase();
    suggestBox.innerHTML = "";
    var shown = 0;
    suggestions.forEach(function (entry, rank) {
      if (q && entry.name.toLowerCase().indexOf(q) === -1) return;
      var medal = rank === 0 ? "🏆 " : rank === 1 ? "🥈 " : "";
      var b = document.createElement("button");
      b.type = "button";
      b.className = "suggest__item";
      b.textContent = medal + entry.name + " (" + entry.count + ")";
      // mousedown (not click) so it fires before the input's blur hides the box
      b.addEventListener("mousedown", function (e) {
        e.preventDefault();
        heardInput.value = entry.name;
        suggestBox.hidden = true;
      });
      suggestBox.appendChild(b);
      shown++;
    });
    suggestBox.hidden = shown === 0;
  }

  if (heardInput && suggestBox) {
    heardInput.addEventListener("focus", renderSuggest);
    heardInput.addEventListener("input", renderSuggest);
    heardInput.addEventListener("blur", function () {
      setTimeout(function () { suggestBox.hidden = true; }, 150);
    });
    heardInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") suggestBox.hidden = true;
    });
  }

  /* -------------------- 4. Email capture -------------------- */
  var addrToggle = document.querySelector("[data-address-toggle]");
  var addrRegion = document.querySelector("[data-address-region]");
  if (addrToggle && addrRegion) {
    addrToggle.addEventListener("click", function () {
      var open = addrToggle.getAttribute("aria-expanded") === "true";
      addrToggle.setAttribute("aria-expanded", String(!open));
      addrRegion.hidden = open;
    });
  }

  var form = document.querySelector("[data-capture-form]");
  var success = document.querySelector("[data-form-success]");
  if (form && success) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new URLSearchParams(new FormData(form)).toString();

      function reveal() {
        success.hidden = false;
        form.reset();
        if (addrToggle) addrToggle.setAttribute("aria-expanded", "false");
        if (addrRegion) addrRegion.hidden = true;
      }

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data
      })
        .then(reveal)
        // On a local preview there's no Netlify handler, so still confirm.
        .catch(reveal);
    });
  }

  /* -------------------- 5. Video toggle -------------------- */
  var videoTrigger = document.querySelector("[data-video-trigger]");
  var videoRegion = document.querySelector("[data-video-region]");
  if (videoTrigger && videoRegion) {
    videoTrigger.addEventListener("click", function () {
      var open = videoTrigger.getAttribute("aria-expanded") === "true";
      videoTrigger.setAttribute("aria-expanded", String(!open));
      if (!open) {
        if (!videoRegion.querySelector("iframe")) {
          var iframe = document.createElement("iframe");
          // Must be the /embed/ URL — watch?v= pages refuse to load in iframes.
          iframe.src = "https://www.youtube.com/embed/KSrXyIQeAUo";
          iframe.title = "Ayakucho — how to play in 60 seconds";
          iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          videoRegion.appendChild(iframe);
        }
        videoRegion.hidden = false;
      } else {
        videoRegion.hidden = true;
      }
    });
  }

  /* -------------------- 6. FAQ expanders -------------------- */
  document.querySelectorAll("[data-faq]").forEach(function (faq) {
    var btn = faq.querySelector("[data-faq-toggle]");
    var more = faq.querySelector("[data-faq-more]");
    var label = faq.querySelector("[data-faq-btn-label]");
    if (!btn || !more) return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      more.hidden = open;
      if (label) label.textContent = open ? t("more", "More") : t("less", "Less");
    });
  });

  function refreshFaqLabels() {
    document.querySelectorAll("[data-faq]").forEach(function (faq) {
      var btn = faq.querySelector("[data-faq-toggle]");
      var label = faq.querySelector("[data-faq-btn-label]");
      if (!btn || !label) return;
      label.textContent = btn.getAttribute("aria-expanded") === "true" ? t("less", "Less") : t("more", "More");
    });
  }
  document.addEventListener("ayk:lang", refreshFaqLabels);
  refreshFaqLabels();

  /* -------------------- 7. Meet the creators -------------------- */
  document.querySelectorAll("[data-creator]").forEach(function (card) {
    var btn = card.querySelector("[data-creator-toggle]");
    var panel = card.querySelector("[data-creator-panel]");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
  });

  // "Get in touch" that copies an email address to the clipboard.
  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    var label = btn.querySelector("[data-i18n]");
    btn.addEventListener("click", function () {
      var email = btn.getAttribute("data-copy-email");
      function feedback() {
        if (!label) return;
        label.textContent = t("copied", "Email copied!");
        setTimeout(function () { label.textContent = t("getInTouch", "Get in touch"); }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(feedback).catch(feedback);
      } else {
        // Ancient-browser fallback
        var tmp = document.createElement("textarea");
        tmp.value = email;
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand("copy"); } catch (e) { /* ignore */ }
        document.body.removeChild(tmp);
        feedback();
      }
    });
  });
})();
