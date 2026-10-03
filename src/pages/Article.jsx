import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  ChevronDown,
  FileText,
} from "lucide-react";
import { posts, dateLabel } from "../data/site";
import NotFound from "./NotFound";
import { getPost, loadPost } from "../data/content";
export default function Article({ type }) {
  const { slug } = useParams();
  const metadata = posts.find((p) => p.slug === slug && p.type === type);
  const [loaded, setLoaded] = useState(() => getPost(slug));
  const [failed, setFailed] = useState(false);
  const post = loaded?.slug === slug ? loaded : null;
  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    if (metadata)
      loadPost(slug)
        .then((value) => {
          if (!cancelled) setLoaded(value);
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    return () => {
      cancelled = true;
    };
  }, [slug, metadata]);
  const [active, setActive] = useState(post?.sections[0]?.id);
  const { scrollYProgress } = useScroll({ trackContentSize: true });
  useEffect(() => {
    if (!post) return;
    setActive(post.sections[0].id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 },
    );
    for (const section of document.querySelectorAll(".article-section"))
      observer.observe(section);
    return () => observer.disconnect();
  }, [post]);
  if (!metadata) return <NotFound />;
  if (!post)
    return (
      <main id="main" tabIndex={-1} className="container article-page">
        <h1>{metadata.title}</h1>
        <p className="article-deck" role="status">
          {failed
            ? "This entry could not be loaded. Refresh the page to try again."
            : "Loading the entry…"}
        </p>
        {failed && (
          <a
            href={`/${type === "blog" ? "blog" : "articles"}/${slug}/`}
            className="button"
          >
            Reload entry
          </a>
        )}
      </main>
    );
  const collection = type === "blog" ? "/blog/" : "/articles/";
  return (
    <>
      <motion.div
        className="reading-progress"
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
      />
      <main id="main" tabIndex={-1} className="container article-page">
        <div className="article-top">
          <Link className="back-link" to={collection}>
            <ArrowLeft size={16} />
            Back to {type === "blog" ? "the blog" : "articles"}
          </Link>
          <div className="eyebrow muted">{post.category}</div>
          <h1>
            {post.title}
            <span className="accent">.</span>
          </h1>
          <p className="article-deck">{post.description}</p>
          <div className="article-meta">
            <span className="author-avatar" aria-hidden="true">
              sk
            </span>
            <span>
              <strong>satyam2003-dev</strong>
              <time dateTime={post.date}>{dateLabel(post.date)}</time>
            </span>
            <span className="meta-divider" />
            <span className="reading-time">
              <Clock size={15} />
              {post.minutes} min read
            </span>
            <span className="word-count">
              <FileText size={15} />
              {post.words.toLocaleString("en-US")} words
            </span>
            <div className="tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="article-layout">
          <article className="article-body">
            {post.sections.map((section) => (
              <section
                className="article-section"
                id={section.id}
                key={section.id}
              >
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.html }} />
              </section>
            ))}
            <section className="article-sources" id="sources">
              <span className="eyebrow muted">Keep exploring</span>
              <h2>Sources &amp; further reading</h2>
              <ul>
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url}>
                      {source.title}
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
              {type === "blog" && (
                <p className="meta">
                  Professional and project details are based on the supplied
                  resume. Education and profile statistics were checked on 3
                  October 2026. The study methods and future exercises are
                  proposals for this notebook.
                </p>
              )}
            </section>
            <div className="article-end">
              <span className="label">End of entry</span>
              <Link className="text-link" to={collection}>
                <ArrowLeft size={17} />
                Back to {type === "blog" ? "the blog" : "articles"}
              </Link>
            </div>
          </article>
          <aside className="article-toc" aria-label="On this page">
            <details open>
              <summary>
                <span className="label">On this page</span>
                <ChevronDown size={16} />
              </summary>
              <div className="toc-items">
                {post.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={active === section.id ? "active" : ""}
                    aria-current={
                      active === section.id ? "location" : undefined
                    }
                  >
                    {section.title}
                  </a>
                ))}
                <a href="#sources">Sources &amp; further reading</a>
              </div>
            </details>
            <span className="toc-footnote">
              Read slowly. Question the assumptions.
            </span>
          </aside>
        </div>
      </main>
    </>
  );
}
