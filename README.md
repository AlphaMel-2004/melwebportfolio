# Rumel B. Eumague Jr. Portfolio

Static developer portfolio built with semantic HTML, custom CSS, vanilla JavaScript, Bootstrap, and Bootstrap Icons. No backend, database, authentication, CMS, or build step is required.

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any static server. A simple option is:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Updating Profile Information

Edit `index.html` for the hero text, about text, experience rows, stack section, contact information, and social links. The shared navigation/footer markup is repeated in each HTML page, so update the same link everywhere if a global link changes.

## Adding A Project

1. Open `assets/js/data/projects.js`.
2. Duplicate a project object.
3. Change `slug` to a short URL-safe value.
4. Add `title`, `role`, `summary`, `description`, `responsibilities`, and `technologies`.
5. Add a project image path. Recommended preview size: 1200 x 780, SVG/WebP/AVIF, ideally under 250 KB.
6. Add `demoUrl` and `repositoryUrl` only when real public URLs are available.
7. Set `published: true`.
8. Set `featured: true` if it should appear in the homepage stack.
9. Test `projects.html` and `project.html?slug=your-slug`.

Array order controls display order.

## Adding A Blog Post

1. Open `assets/js/data/blogs.js`.
2. Add an internal or external post object.
3. Add `title`, `excerpt`, `category`, `platform`, `publishedAt`, and `readingTime`.
4. For an internal article, use `type: "internal"` and fill the `content` array.
5. For an external LinkedIn, Facebook, GitHub Discussion, or other public post, use `type: "external"` and add the public URL to `sourceUrl`.
6. Add `coverImage` only when an actual image is available.
7. Set `published: true` when ready.
8. Set `featured: true` to feature a post.
9. Test `blogs.html` and `blog.html?slug=your-slug`.

Draft samples are included with `published: false`, so they do not appear publicly.

## Replacing The Resume

Replace `assets/documents/resume.pdf` with the real public resume PDF. Keep the same filename so all download links continue to work.

## Replacing Images

Project previews live in `assets/images/projects/`. Blog images should live in `assets/images/blog/`. Use meaningful filenames, include useful alt text in the data/content, and keep static assets lightweight. Recommended image sizes:

- Project preview: 1200 x 780, under 250 KB when possible.
- Blog cover: 1200 x 780, under 300 KB when possible.
- Inline blog image: match the article need, usually 900-1200 px wide.

## SEO Notes

Page-level metadata is in each HTML file. When adding real published articles, manually update titles, descriptions, canonical URLs, Open Graph metadata, Twitter metadata, `sitemap.xml`, and article structured data where appropriate. Do not add misleading structured data for unpublished drafts or external posts.

## Static Deployment

Deploy the folder as a static site on Cloudflare Pages, GitHub Pages, Netlify, or a similar host. No install command or build command is needed. Use the project root as the publish directory.

## Current Limitations

- Blog samples are intentionally unpublished, so the public blog page starts with an empty state until Rumel adds real posts.
- `assets/documents/resume.pdf` is a placeholder and should be replaced with the real resume.
- Project images are abstract visual previews, not screenshots or fabricated product metrics.
