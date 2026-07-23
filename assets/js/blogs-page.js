document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector("[data-blog-list]");
    if (!list) {
        return;
    }

    const search = document.querySelector("[data-blog-search]");
    const category = document.querySelector("[data-blog-category]");
    const platform = document.querySelector("[data-blog-platform]");
    const count = document.querySelector("[data-blog-count]");
    const loadMore = document.querySelector("[data-load-more]");
    const featured = document.querySelector("[data-featured-blog]");
    const posts = (window.blogPosts || [])
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    let visible = 6;

    const postHref = (post) => post.type === "external" ? post.sourceUrl : `blog.html?slug=${encodeURIComponent(post.slug)}`;

    const createCard = (post) => {
        const link = document.createElement("a");
        link.className = "blog-card reveal is-visible";
        link.href = postHref(post);
        if (post.type === "external") {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
        const meta = document.createElement("div");
        meta.className = "meta-row";
        meta.textContent = `${formatDate(post.publishedAt)} / ${post.category} / ${post.readingTime} / ${post.platform}`;
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
    };

    const fillSelect = (select, values, label) => {
        if (!select) return;
        select.replaceChildren(new Option(label, ""));
        values.forEach((value) => select.append(new Option(value, value)));
    };

    const filteredPosts = () => {
        const query = (search?.value || "").trim().toLowerCase();
        return posts.filter((post) => {
            const matchesQuery = [post.title, post.excerpt, post.category, post.platform]
                .join(" ")
                .toLowerCase()
                .includes(query);
            const matchesCategory = !category?.value || post.category === category.value;
            const matchesPlatform = !platform?.value || post.platform === platform.value;
            return matchesQuery && matchesCategory && matchesPlatform;
        });
    };

    const render = () => {
        const filtered = filteredPosts();
        list.replaceChildren();
        if (count) {
            count.textContent = `${filtered.length} published ${filtered.length === 1 ? "entry" : "entries"}`;
        }
        if (filtered.length === 0) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.textContent = posts.length === 0 ? "No published thoughts yet. Drafts are ready in the data file." : "No posts match the current filters.";
            list.append(empty);
        } else {
            filtered.slice(0, visible).forEach((post) => list.append(createCard(post)));
        }
        if (loadMore) {
            loadMore.hidden = filtered.length <= visible;
        }
    };

    if (featured) {
        const featuredPost = posts.find((post) => post.featured) || posts[0];
        featured.replaceChildren();
        featured.append(featuredPost ? createCard(featuredPost) : emptyNode("No featured article is published yet."));
    }

    fillSelect(category, [...new Set(posts.map((post) => post.category))], "All categories");
    fillSelect(platform, [...new Set(posts.map((post) => post.platform))], "All platforms");

    [search, category, platform].forEach((control) => {
        control?.addEventListener("input", () => {
            visible = 6;
            render();
        });
    });
    loadMore?.addEventListener("click", () => {
        visible += 6;
        render();
    });
    render();
});

function formatDate(value) {
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function emptyNode(text) {
    const node = document.createElement("div");
    node.className = "empty-state";
    node.textContent = text;
    return node;
}
