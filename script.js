const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"], .site-footer a[href^="#"], .brand[href^="#"]');

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const scrollToSection = (id, behavior = "smooth") => {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  if (id === "contact") {
    const pageBottom = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.max(0, pageBottom), behavior });
    return;
  }

  const headerOffset = header ? header.offsetHeight : 0;
  let targetTop = target.getBoundingClientRect().top + window.scrollY;

  if (id === "work") {
    const heading = target.querySelector(".section-kicker");
    const currently = document.getElementById("currently");
    const desiredHeadingGap = currently
      ? Number.parseFloat(window.getComputedStyle(currently).paddingTop) || 0
      : 0;

    if (heading) {
      targetTop = heading.getBoundingClientRect().top + window.scrollY - desiredHeadingGap;
    }
  }

  const top = Math.max(0, targetTop - headerOffset);
  window.scrollTo({ top, behavior });
};

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    event.preventDefault();
    scrollToSection(id);
    history.pushState(null, "", `#${id}`);

    link.blur();
  });
});

window.addEventListener("load", () => {
  if (!window.location.hash) {
    return;
  }

  const id = window.location.hash.slice(1);

  requestAnimationFrame(() => {
    scrollToSection(id, "auto");
  });
  window.setTimeout(() => scrollToSection(id, "auto"), 80);
  window.setTimeout(() => scrollToSection(id, "auto"), 240);
});

year.textContent = new Date().getFullYear();
updateHeader();
window.addEventListener("scroll", () => {
  updateHeader();

  if (document.activeElement?.matches(".site-nav a")) {
    document.activeElement.blur();
  }
}, { passive: true });
