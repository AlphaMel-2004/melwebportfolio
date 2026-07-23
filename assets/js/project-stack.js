document.addEventListener("DOMContentLoaded", () => {
    const stack = document.querySelector("[data-project-stack]");
    const title = document.querySelector("[data-project-title]");
    const summary = document.querySelector("[data-project-summary]");
    const role = document.querySelector("[data-project-role]");
    const year = document.querySelector("[data-project-year]");
    const tags = document.querySelector("[data-project-tags]");
    const counter = document.querySelector("[data-project-counter]");
    const viewLink = document.querySelector("[data-project-view]");
    const repoLink = document.querySelector("[data-project-repo]");
    const live = document.querySelector("[data-project-live]");
    const indicators = document.querySelector("[data-project-indicators]");
    const prev = document.querySelector("[data-project-prev]");
    const next = document.querySelector("[data-project-next]");

    const projects = (window.portfolioProjects || []).filter((project) => project.published && project.featured);
    let active = 0;
    let touchStartX = 0;

    if (!stack || projects.length === 0) {
        return;
    }

    const createButton = (project, index) => {
        const button = document.createElement("button");
        button.className = "stack-card";
        button.type = "button";
        button.dataset.index = index.toString();
        button.setAttribute("aria-label", "Show " + project.title);

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.title + " project preview";
        image.width = 1200;
        image.height = 780;
        image.loading = index === 0 ? "eager" : "lazy";

        const caption = document.createElement("span");
        caption.className = "stack-card-caption";
        caption.innerHTML = "<strong></strong><span></span>";
        caption.querySelector("strong").textContent = project.title;
        caption.querySelector("span").textContent = project.role;

        button.append(image, caption);
        return button;
    };

    const renderIndicators = () => {
        if (!indicators) {
            return;
        }
        indicators.replaceChildren();
        projects.forEach((project, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("aria-label", "Show project " + project.number + ": " + project.title);
            button.addEventListener("click", () => setActive(index));
            indicators.append(button);
        });
    };

    const relativeOffset = (index) => {
        const total = projects.length;
        let offset = index - active;
        if (offset > total / 2) {
            offset -= total;
        }
        if (offset < -total / 2) {
            offset += total;
        }
        return offset;
    };

    const updateCardPositions = () => {
        stack.querySelectorAll(".stack-card").forEach((card) => {
            const index = Number(card.dataset.index);
            const offset = relativeOffset(index);
            const depth = Math.abs(offset);
            const direction = offset >= 0 ? 1 : -1;
            const visibleDepth = Math.min(depth, 3);

            card.style.setProperty("--x", `${direction * visibleDepth * 22}px`);
            card.style.setProperty("--y", `${visibleDepth * 20}px`);
            card.style.setProperty("--scale", `${1 - visibleDepth * 0.045}`);
            card.style.setProperty("--opacity", `${depth > 3 ? 0 : 1 - visibleDepth * 0.12}`);
            card.style.setProperty("--z", `${20 - visibleDepth}`);
            card.disabled = offset === 0;
            card.setAttribute("aria-current", offset === 0 ? "true" : "false");
            card.tabIndex = depth > 3 ? -1 : 0;
        });
    };

    const updateDetails = () => {
        const project = projects[active];
        if (title) title.textContent = project.title;
        if (summary) summary.textContent = project.summary;
        if (role) role.textContent = project.role;
        if (year) year.textContent = project.year || "Selected work";
        if (counter) counter.textContent = `${project.number} / ${String(projects.length).padStart(2, "0")}`;
        if (viewLink) viewLink.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
        if (repoLink) {
            repoLink.hidden = !project.repositoryUrl;
            repoLink.href = project.repositoryUrl || "#";
        }
        if (tags) {
            tags.replaceChildren(...project.technologies.slice(0, 6).map((technology) => {
                const item = document.createElement("li");
                item.className = "tag";
                item.textContent = technology;
                return item;
            }));
        }
        if (indicators) {
            indicators.querySelectorAll("button").forEach((button, index) => {
                button.setAttribute("aria-current", index === active ? "true" : "false");
            });
        }
        if (live) {
            live.textContent = project.title + " is now selected.";
        }
    };

    const setActive = (index) => {
        active = (index + projects.length) % projects.length;
        updateCardPositions();
        updateDetails();
    };

    projects.forEach((project, index) => {
        const card = createButton(project, index);
        card.addEventListener("click", () => setActive(index));
        stack.append(card);
    });

    renderIndicators();
    prev?.addEventListener("click", () => setActive(active - 1));
    next?.addEventListener("click", () => setActive(active + 1));

    document.addEventListener("keydown", (event) => {
        if (!stack.matches(":hover") && !stack.contains(document.activeElement)) {
            return;
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            setActive(active - 1);
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            setActive(active + 1);
        }
    });

    stack.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    stack.addEventListener("touchend", (event) => {
        const delta = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 40) {
            setActive(delta > 0 ? active - 1 : active + 1);
        }
    }, { passive: true });

    setActive(0);
});
