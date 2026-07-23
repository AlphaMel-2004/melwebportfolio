document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector("[data-projects-list]");
    if (!list) {
        return;
    }

    const projects = (window.portfolioProjects || []).filter((project) => project.published);
    list.replaceChildren();

    if (projects.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "No published projects yet.";
        list.append(empty);
        return;
    }

    projects.forEach((project) => {
        const link = document.createElement("a");
        link.className = "project-list-card reveal is-visible";
        link.href = `project.html?slug=${encodeURIComponent(project.slug)}`;

        const meta = document.createElement("div");
        meta.className = "meta-row";
        meta.textContent = `${project.number} / ${project.role} / ${project.year || "Selected work"}`;
        const title = document.createElement("h3");
        title.textContent = project.title;
        const summary = document.createElement("p");
        summary.className = "muted mb-0";
        summary.textContent = project.summary;
        const tags = document.createElement("ul");
        tags.className = "tag-list";
        project.technologies.slice(0, 7).forEach((technology) => {
            const tag = document.createElement("li");
            tag.className = "tag";
            tag.textContent = technology;
            tags.append(tag);
        });

        link.append(meta, title, summary, tags);
        list.append(link);
    });
});
