/*
    Blog content guide
    - Add a post by duplicating one object in window.blogPosts.
    - Use type: "internal" for portfolio articles rendered by blog.html?slug=your-slug.
    - Use type: "external" for public LinkedIn, Facebook, GitHub Discussion, or other public posts.
    - For external posts, set sourceUrl to the public URL. The site does not scrape or embed social posts.
    - Add a cover image with coverImage: "assets/images/blog/example.webp" and meaningful alt text in content image blocks.
    - Hide drafts with published: false. Feature posts with featured: true.
    - Change publishedAt using YYYY-MM-DD. Newer dates appear first.
    - Only supported internal content types are paragraph, heading, quote, code, and image.
*/
window.blogPosts = [
    {
        slug: "replace-with-real-post",
        title: "Replace this with a real post",
        excerpt: "Add a concise description of the article before publishing it.",
        content: [
            {
                type: "paragraph",
                text: "Write the article in this content array. Change published to true when it is ready."
            }
        ],
        category: "Development",
        platform: "Portfolio",
        sourceUrl: "",
        coverImage: "",
        publishedAt: "2026-01-01",
        readingTime: "3 min read",
        featured: false,
        published: false,
        type: "internal"
    },
    {
        slug: "linkedin-post-example",
        title: "Post title",
        excerpt: "Short summary written by Rumel.",
        content: [],
        category: "Development",
        platform: "LinkedIn",
        sourceUrl: "PUBLIC_LINKEDIN_POST_URL",
        coverImage: "",
        publishedAt: "2026-01-01",
        readingTime: "LinkedIn post",
        featured: false,
        published: false,
        type: "external"
    }
];
