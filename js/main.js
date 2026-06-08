/* Water Sport Centar Selce — interactions */
(function () {
  "use strict";

  /* ---- Sticky header state ---- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll(".nav__links a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Gallery lightbox ---- */
  const items = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (items.length) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav prev" aria-label="Previous">&#8249;</button>' +
      '<button class="lightbox__nav next" aria-label="Next">&#8250;</button>' +
      '<img alt="">';
    document.body.appendChild(box);

    const imgEl = box.querySelector("img");
    const sources = items.map((i) => i.querySelector("img").getAttribute("src"));
    let idx = 0;

    const show = (i) => {
      idx = (i + sources.length) % sources.length;
      imgEl.setAttribute("src", sources[idx]);
    };
    const open = (i) => {
      show(i);
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      box.classList.remove("open");
      document.body.style.overflow = "";
    };

    items.forEach((it, i) => it.addEventListener("click", () => open(i)));
    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".prev").addEventListener("click", (e) => { e.stopPropagation(); show(idx - 1); });
    box.querySelector(".next").addEventListener("click", (e) => { e.stopPropagation(); show(idx + 1); });
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---- Contact form (front-end only demo) ---- */
  const form = document.querySelector(".contact-form form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.textContent = "Thank you! We'll be in touch ✓";
      btn.disabled = true;
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 4000);
    });
  }

  /* ---- Footer year ---- */
  const yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
