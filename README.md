# sec.notes — Satyam Kumar

A cybersecurity portfolio and growing public notebook, authored as **satyam2003-dev**.

Live: https://satyam2003-dev.github.io/

## Develop and validate

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5188/. Vite refreshes changes automatically.

```sh
npm run build
npm run check
npm run preview
```

The production build prerenders every route as HTML, then hydrates it with React. Direct article URLs work on GitHub Pages, and the writing remains readable without JavaScript. `dist/` is generated and is not committed.

## Structure and growth

- `src/components/`: reusable navigation, themes, writing cards, topic grid, and animated security doodle.
- `src/pages/`: homepage, collections, long-form reader, profile, empty notes, and custom 404.
- `src/styles/site.css`: shared design tokens and responsive dark/white styles.
- `content/catalog.json`: post metadata and source references.
- `content/*.html`: trusted, repository-owned article bodies.
- `scripts/prepare-content.mjs`: validates and generates lightweight metadata plus separate article bodies, word counts, and reading times.
- `scripts/build.mjs`: Vite client/server builds, prerendering, sitemap, and robots file.
- `scripts/check.mjs`: validates routes, local assets, anchors, metadata, authors, and content minimums.

React, React Router, and Motion provide component composition, navigation, and animation. Motion honours reduced-motion preferences. Article bodies load separately on demand, while the full content is prerendered for direct visits. Header search indexes titles, descriptions, topics, and pages, with a native modal and keyboard controls. Dark is the default theme; an explicit choice is remembered. The mountain hero stays at full strength in both themes. Fonts and artwork are hosted locally. There are no analytics or external rendering dependencies.

The initial collection contains exactly **one blog and one technical article**, each over 4,000 body words. Notes are empty. To add writing, add a catalog record and a body file using unique `<section id="..."><h2>...</h2>...</section>` sections. The generator and prerenderer discover posts from the catalog. The current minimum-word and collection-count checks encode this initial brief; change those deliberately as the publication grows. Only trusted local content is rendered as HTML.

This is a static publishing foundation. Accounts, a CMS, commerce, and persistent backend data can be introduced as separate services when those requirements exist.

## Content provenance

Sources checked on 3 October 2026:

- Supplied `Satyam_Resume.pdf`: employment, academic projects, skills, certifications, and community activities. The original PDF is excluded from the public repository because it also contains a phone number and an older admissions objective.
- https://tryhackme.com/p/cyberhitman: top 1%, 290 completed rooms, 53 badges, 104-day streak; visible completed rooms include Introduction to DevSecOps, SSDLC, Dependency Management, Linux Fundamentals Part 1, and AI security topics. Statistics are a dated snapshot, not an automatic feed.
- https://www.linkedin.com/in/iamsatyam1/: current MS in AI & Cybersecurity studies at IIT Patna, DevSecOps/cloud background, and photography interests. This supersedes the resume’s older admissions objective; no unsupported enrollment dates were added.
- https://github.com/Satyam2003-dev: profile identity and photography links (Pexels and Unsplash). No project repositories have been invented or mapped to resume projects without evidence.
- The technical article links to the official TryHackMe, GitHub Actions, and AWS IAM references it uses.

Fonts: IBM Plex Sans, JetBrains Mono, and Caveat; OFL licenses accompany the local font files. AI-generated landscape and cybersecurity covers are decorative artwork and do not depict Satyam. See [visual asset notes](docs/visual-assets.md).

## GitHub Pages / CI/CD

Pull requests build and validate. Pushes to `main` build, validate, upload `dist/`, and deploy through GitHub Pages. The jobs use Ubuntu 24.04 and Actions with Node 24 runtimes. Actions are pinned to commit SHAs; Pages and OIDC permissions are scoped to the deployment job. No personal tokens or cloud credentials are stored in the repository.

Repository: `Satyam2003-dev/satyam2003-dev.github.io`. Pages source: **GitHub Actions**. The root URL requires no repository base-path prefix. Every successful push to `main` deploys automatically.
