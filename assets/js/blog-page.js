document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("[data-blog-page]");
    if (!root) {
        return;
    }

    const posts = (window.blogPosts || [])
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    const slug = new URLSearchParams(window.location.search).get("slug");
    const post = posts.find((item) => item.slug === slug);

    if (!post) {
        root.innerHTML = `<section class="article-shell section-block"><h1 class="page-title">Post not found.</h1><p class="lead-text">This post may still be a draft or the link may be incorrect.</p><a class="btn-portfolio" href="blogs.html">Back to blogs</a></section>`;
        document.title = "Post not found | Rumel Eumague";
        return;
    }

    document.title = `${post.title} | Rumel Eumague`;
    root.querySelector("[data-title]").textContent = post.title;
    root.querySelector("[data-meta]").textContent = `${formatDate(post.publishedAt)} / ${post.category} / ${post.readingTime} / ${post.platform}`;
    root.querySelector("[data-excerpt]").textContent = post.excerpt;

    const content = root.querySelector("[data-content]");
    const external = root.querySelector("[data-external-action]");
    if (post.type === "external") {
        content.replaceChildren();
        const paragraph = document.createElement("p");
        paragraph.textContent = "This is an external public post. Use the button below to read it on the original platform.";
        content.append(paragraph);
        external.hidden = false;
        external.href = post.sourceUrl;
        external.textContent = "Read the original post on " + post.platform;
    } else {
        external.hidden = true;
        content.replaceChildren(...post.content.map(renderBlock).filter(Boolean));
    }

    const cover = root.querySelector("[data-cover]");
    if (cover) {
        if (post.coverImage) {
            cover.src = post.coverImage;
            cover.alt = post.title + " cover image";
            cover.hidden = false;
        } else {
            cover.hidden = true;
        }
    }

    const index = posts.indexOf(post);
    const previous = posts[(index - 1 + posts.length) % posts.length];
    const next = posts[(index + 1) % posts.length];
    root.querySelector("[data-prev]").href = `blog.html?slug=${encodeURIComponent(previous.slug)}`;
    root.querySelector("[data-prev]").textContent = "Previous: " + previous.title;
    root.querySelector("[data-next]").href = `blog.html?slug=${encodeURIComponent(next.slug)}`;
    root.querySelector("[data-next]").textContent = "Next: " + next.title;

    const copyLink = root.querySelector("[data-copy-link]");
    const feedback = root.querySelector("[data-copy-feedback]");
    copyLink?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            feedback.textContent = "Link copied.";
        } catch (error) {
            feedback.textContent = "Copy failed.";
        }
    });
});

function renderBlock(block) {
    if (!block || !block.type) {
        return null;
    }
    if (block.type === "paragraph") {
        const p = document.createElement("p");
        p.textContent = block.text || "";
        return p;
    }
    if (block.type === "heading") {
        const h2 = document.createElement("h2");
        h2.textContent = block.text || "";
        return h2;
    }
    if (block.type === "quote") {
        const quote = document.createElement("blockquote");
        quote.textContent = block.text || "";
        return quote;
    }
    if (block.type === "code") {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = block.text || "";
        if (block.language) {
            code.dataset.language = block.language;
        }
        pre.append(code);
        return pre;
    }
    if (block.type === "image" && block.src) {
        const image = document.createElement("img");
        image.src = block.src;
        image.alt = block.alt || "";
        image.loading = "lazy";
        return image;
    }
    return null;
}

function formatDate(value) {
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}
