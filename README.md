# sec.notes

Satyam Kumar’s cybersecurity notebook, authored as **satyam2003-dev**. Built from the supplied Cybersecurity Study Site Design: dark surfaces, mint accents, IBM Plex Sans body text, and JetBrains Mono display/terminal text.

Live URL: https://satyam2003-dev.github.io/Sec-Notes/

## Local preview

Requires Node.js 22 or later; no runtime dependencies.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5187/Sec-Notes/. After edits, rebuild with `npm run build` and refresh the page. Set `PORT` if another preview port is needed.

```sh
npm run build
npm run check
```

## Content

The initial site has exactly one blog post and one technical article in `content/posts.mjs`. Notes are intentionally empty. Edit the profile/layout in `scripts/build.mjs`, styling in `public/assets/style.css`, and writing in `content/posts.mjs`. The two initial pieces are newly prepared starter copy based on the supplied material, rather than previously published posts or reconstructed lab walkthroughs. Review them when updating the notebook.

Sources checked on 3 October 2026:

- Supplied `Satyam_Resume.pdf`: employment, academic projects, skills, certifications, and community activities. The original PDF is excluded from the public repository because it also contains a phone number and an older admissions objective.
- https://tryhackme.com/p/cyberhitman: top 1%, 290 completed rooms, 53 badges, 104-day streak; visible completed rooms include Introduction to DevSecOps, SSDLC, Dependency Management, Linux Fundamentals Part 1, and AI security topics. Statistics are a dated snapshot, not an automatic feed.
- https://www.linkedin.com/in/iamsatyam1/: current MS in AI & Cybersecurity studies at IIT Patna, DevSecOps/cloud background, and photography interests. This supersedes the resume’s older admissions objective; no unsupported enrollment dates were added.
- https://github.com/Satyam2003-dev: profile identity and photography links (Pexels and Unsplash). No project repositories have been invented or mapped to resume projects without evidence.
- The technical article links to the official TryHackMe, GitHub Actions, and AWS IAM references it uses.

Fonts are hosted locally under `public/assets/fonts/`, sourced from Google Fonts (IBM Plex Sans and JetBrains Mono). Their OFL licenses are included alongside the fonts. No external requests or analytics are required to render the site. A small local script switches between the dark and white themes and remembers the choice; all content remains readable without JavaScript.

## GitHub Pages / CI/CD

Pull requests run a build and validation. Pushes to `main` build, validate, upload only `dist/`, and deploy through GitHub Pages. Actions are pinned to commit SHAs; deployment permissions are scoped to the deployment job. No personal tokens or cloud credentials are stored in the repository.

An owner/admin must enable **Settings → Pages → Build and deployment → Source: GitHub Actions** once. Then rerun the deployment workflow if needed. Updates on `main` deploy automatically after checks pass.
