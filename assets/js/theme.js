(function () {
    const storageKey = "rumel-theme";
    const root = document.documentElement;
    const saved = localStorage.getItem(storageKey);
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    root.dataset.theme = saved || preferred;

    document.addEventListener("DOMContentLoaded", () => {
        const toggles = document.querySelectorAll("[data-theme-toggle]");

        const updateLabels = () => {
            const isDark = root.dataset.theme === "dark";
            toggles.forEach((toggle) => {
                toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
                const icon = toggle.querySelector("i");
                if (icon) {
                    icon.className = isDark ? "bi bi-sun" : "bi bi-moon";
                }
            });
        };

        toggles.forEach((toggle) => {
            toggle.addEventListener("click", () => {
                root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
                localStorage.setItem(storageKey, root.dataset.theme);
                updateLabels();
            });
        });

        updateLabels();
    });
}());
