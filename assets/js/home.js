document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.querySelector("[data-home-blogs]");
    const projectsLink = document.querySelector("[data-home-projects-link]");
    const posts = (window.blogPosts || [])
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 3);

    if (blogList) {
        blogList.replaceChildren();
        if (posts.length === 0) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.textContent = "No published thoughts yet. A draft sample is documented in the blog data file.";
            blogList.append(empty);
        } else {
            posts.forEach((post) => blogList.append(createBlogPreview(post)));
        }
    }

    if (projectsLink && (window.portfolioProjects || []).filter((project) => project.published).length === 0) {
        projectsLink.hidden = true;
    }
});

function createBlogPreview(post) {
    const link = document.createElement("a");
    link.className = "blog-card reveal is-visible";
    link.href = post.type === "external" ? post.sourceUrl : `blog.html?slug=${encodeURIComponent(post.slug)}`;
    if (post.type === "external") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    }

    const meta = document.createElement("div");
    meta.className = "meta-row";
    meta.textContent = `${formatHomeDate(post.publishedAt)} / ${post.category} / ${post.readingTime} / ${post.platform}`;
    const title = document.createElement("h3");
    title.textContent = post.title;
    const excerpt = document.createElement("p");
    excerpt.className = "muted mb-0";
    excerpt.textContent = post.excerpt;
    const arrow = document.createElement("i");
    arrow.className = "bi bi-arrow-up-right";
    arrow.setAttribute("aria-hidden", "true");

    link.append(meta, title, excerpt, arrow);
    return link;
}

function formatHomeDate(value) {
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}
