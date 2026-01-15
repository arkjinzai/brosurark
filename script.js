(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  const setMenu = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));

    // close on outside click
    document.addEventListener("click", (e) => {
      const isOpen = nav.classList.contains("is-open");
      if (!isOpen) return;
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (nav.contains(target) || toggle.contains(target)) return;
      setMenu(false);
    });

    // close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });

    // close after click link
    nav.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });
  }

  // Pager highlight (mode brosur)
  const pagerDots = Array.from(document.querySelectorAll(".pager__dot"));
  const pages = Array.from(document.querySelectorAll(".brochure-page"));
  const brochure = document.querySelector(".brochure");

  const setActiveDot = (id) => {
    pagerDots.forEach((d) => d.classList.toggle("is-active", d.getAttribute("href") === `#${id}`));
  };

  if (pagerDots.length && pages.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        // pilih yang paling terlihat
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveDot(visible.target.id);
      },
      { threshold: [0.35, 0.5, 0.65] },
    );
    pages.forEach((p) => io.observe(p));
  } else if (pages[0]?.id) {
    setActiveDot(pages[0].id);
  }

  // Shortcut keyboard untuk pindah halaman (mode brosur)
  document.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const current = pages.find((p) => pagerDots.some((d) => d.classList.contains("is-active") && d.getAttribute("href") === `#${p.id}`));
    const idx = current ? pages.indexOf(current) : 0;
    const nextIdx = e.key === "ArrowDown" ? Math.min(idx + 1, pages.length - 1) : Math.max(idx - 1, 0);
    const next = pages[nextIdx];
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Klik pager -> scroll halus (hindari loncat anchor default)
  if (pagerDots.length) {
    pagerDots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const href = dot.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // Scroll wheel halus per-halaman (mode brosur)
  // Catatan: ini membuat scroll terasa seperti slide; jika tidak diinginkan bisa dimatikan.
  let wheelLock = false;
  const wheelCooldownMs = 520;
  const minDelta = 28; // filter gerakan kecil (trackpad halus)

  if (brochure && pages.length) {
    brochure.addEventListener(
      "wheel",
      (e) => {
        // jangan ganggu zoom browser / horizontal scroll
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaY) < minDelta) return;
        if (wheelLock) {
          e.preventDefault();
          return;
        }

        const current = pages.find((p) =>
          pagerDots.some((d) => d.classList.contains("is-active") && d.getAttribute("href") === `#${p.id}`),
        );
        const idx = current ? pages.indexOf(current) : 0;
        const nextIdx = e.deltaY > 0 ? Math.min(idx + 1, pages.length - 1) : Math.max(idx - 1, 0);
        const next = pages[nextIdx];
        if (!next || next === current) return;

        e.preventDefault();
        wheelLock = true;
        next.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => {
          wheelLock = false;
        }, wheelCooldownMs);
      },
      { passive: false },
    );
  }
})();


