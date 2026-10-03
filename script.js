/* ========== SMOOTH SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ========== FAQ ACCORDION (satu terbuka) ========== */
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", function () {
    if (this.open) {
      document.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== this) other.open = false;
      });
    }
  });
});

/* ========== FILTER PAKET ========== */
const filterBtns = document.querySelectorAll(".filter-btn");
const paketGrid = document.getElementById("paketGrid");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const sort = btn.dataset.sort;
    const cards = Array.from(paketGrid.querySelectorAll(".paket-card"));

    cards.sort((a, b) => {
      const hargaA = parseInt(a.dataset.harga);
      const hargaB = parseInt(b.dataset.harga);
      const mbpsA = parseInt(a.dataset.mbps);
      const mbpsB = parseInt(b.dataset.mbps);

      switch (sort) {
        case "murah":
          return hargaA - hargaB;
        case "mahal":
          return hargaB - hargaA;
        case "cepat":
          return mbpsB - mbpsA;
        default:
          return 0;
      }
    });

    cards.forEach((card) => paketGrid.appendChild(card));
  });
});

/* ========== REVEAL ON SCROLL ========== */
const revealTargets = document.querySelectorAll(
  ".section-head, .paket-card, .langkah, .bayar-card, .faq-item, .coverage-card",
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealTargets.forEach((el) => observer.observe(el));

console.log("%cQNN Website Loaded", "color: #2563eb; font-weight: bold;");
