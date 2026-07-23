document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const links = document.querySelectorAll("[data-nav-link]");
    const currentPage = document.body.dataset.page || "";
    const offcanvas = document.getElementById("mobileMenu");

    const setScrolled = () => {
        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        }
    };

    links.forEach((link) => {
        const targetPage = link.dataset.page;
        if (targetPage === currentPage || (currentPage === "home" && link.getAttribute("href")?.startsWith("#"))) {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "page");
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const id = anchor.getAttribute("href");
            if (!id || id === "#") {
                return;
            }
            const target = document.querySelector(id);
            if (!target) {
                return;
            }
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", id);
        });
    });

    if (offcanvas) {
        offcanvas.addEventListener("show.bs.offcanvas", () => document.body.classList.add("menu-open"));
        offcanvas.addEventListener("hidden.bs.offcanvas", () => document.body.classList.remove("menu-open"));
    }

    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
});
