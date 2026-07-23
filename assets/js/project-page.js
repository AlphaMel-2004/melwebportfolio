document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("[data-project-page]");
    if (!root) {
        return;
    }

    const projects = (window.portfolioProjects || []).filter((project) => project.published);
    const slug = new URLSearchParams(window.location.search).get("slug");
    const project = projects.find((item) => item.slug === slug);

    const makeLink = (href, label, className = "btn-quiet") => {
        const link = document.createElement("a");
        link.href = href;
        link.className = className;
        link.textContent = label;
        return link;
    };

    if (!project) {
        root.innerHTML = "";
        const shell = document.createElement("section");
        shell.className = "site-shell section-block";
        const title = document.createElement("h1");
        title.className = "page-title";
        title.textContent = "Project not found.";
        const text = document.createElement("p");
        text.className = "lead-text";
        text.textContent = "This project may have been moved, unpublished, or mistyped.";
        shell.append(title, text, makeLink("projects.html", "Back to projects", "btn-portfolio"));
        root.append(shell);
        document.title = "Project not found | Rumel Eumague";
        return;
    }

    const index = projects.indexOf(project);
    const previous = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    document.title = `${project.title} | Rumel Eumague`;

    root.querySelector("[data-title]").textContent = project.title;
    root.querySelector("[data-role]").textContent = project.role;
    root.querySelector("[data-year]").textContent = project.year || "";
    root.querySelector("[data-description]").textContent = project.description;
    root.querySelector("[data-image]").src = project.image;
    root.querySelector("[data-image]").alt = project.title + " project preview";

    const tags = root.querySelector("[data-tags]");
    tags.replaceChildren(...project.technologies.map((technology) => {
        const item = document.createElement("li");
        item.className = "tag";
        item.textContent = technology;
        return item;
    }));

    const responsibilities = root.querySelector("[data-responsibilities]");
    responsibilities.replaceChildren(...project.responsibilities.map((responsibility) => {
        const item = document.createElement("li");
        item.textContent = responsibility;
        return item;
    }));

    const actions = root.querySelector("[data-actions]");
    actions.append(makeLink("projects.html", "Back to projects"));
    if (project.demoUrl) {
        actions.append(makeLink(project.demoUrl, "View project", "btn-portfolio"));
    }
    if (project.repositoryUrl) {
        actions.append(makeLink(project.repositoryUrl, "Repository"));
    }

    root.querySelector("[data-prev]").href = `project.html?slug=${encodeURIComponent(previous.slug)}`;
    root.querySelector("[data-prev]").textContent = "Previous: " + previous.title;
    root.querySelector("[data-next]").href = `project.html?slug=${encodeURIComponent(next.slug)}`;
    root.querySelector("[data-next]").textContent = "Next: " + next.title;
});
