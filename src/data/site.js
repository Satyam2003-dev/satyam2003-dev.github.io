import posts from "../generated/posts.json";
export { posts };
export const site = {
  origin: "https://satyam2003-dev.github.io",
  author: "satyam2003-dev",
  name: "Satyam Kumar",
  description:
    "A public notebook on cybersecurity, DevSecOps, cloud infrastructure, and AI security.",
  links: {
    github: "https://github.com/Satyam2003-dev",
    linkedin: "https://www.linkedin.com/in/iamsatyam1/",
    tryhackme: "https://tryhackme.com/p/cyberhitman",
    email: "mailto:satyamkumar.sk2003@gmail.com",
  },
};
export const postPath = (p) =>
  `/${p.type === "blog" ? "blog" : "articles"}/${p.slug}/`;
export const dateLabel = (date) =>
  new Date(date + "T12:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
export function pageMetadata(path) {
  const post = posts.find((p) => postPath(p) === path);
  if (post)
    return {
      title: post.title,
      description: post.description,
      type: "article",
    };
  const pages = {
    "/": {
      title: "Satyam Kumar — cybersecurity, cloud & DevSecOps",
      description: site.description,
    },
    "/blog/": {
      title: "Blog — learning in public",
      description:
        "Learning journals on cybersecurity, DevSecOps, and the systems behind the tools.",
    },
    "/articles/": {
      title: "Articles — ideas worth understanding",
      description:
        "Detailed technical references on secure delivery, infrastructure, and cybersecurity.",
    },
    "/notes/": {
      title: "Notes — the notebook begins",
      description:
        "Short cybersecurity references. This collection is intentionally starting empty.",
    },
    "/about/": {
      title: "About Satyam Kumar",
      description:
        "DevSecOps experience, hands-on cybersecurity learning, and AI & Cybersecurity studies at IIT Patna.",
    },
  };
  return (
    pages[path] || {
      title: "Page not found",
      description: "Return to the sec.notes notebook.",
    }
  );
}
