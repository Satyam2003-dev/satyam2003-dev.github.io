import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  X,
  ArrowUpRight,
  BookOpen,
  FileText,
  UserRound,
} from "lucide-react";
import { posts, postPath } from "../data/site";
const pages = [
  {
    title: "About Satyam",
    description:
      "Experience, education, projects, certifications, and contact links.",
    tags: ["AWS", "Linux", "DevSecOps", "IIT Patna", "projects"],
    path: "/about/",
    type: "page",
  },
  {
    title: "Study notes",
    description:
      "The notebook is starting empty. Explore the subjects it will cover.",
    tags: ["Linux", "cloud", "AI", "security"],
    path: "/notes/",
    type: "page",
  },
];
const entries = [
  ...posts.map((post) => ({ ...post, path: postPath(post) })),
  ...pages,
];
export default function SiteSearch() {
  const dialog = useRef(null);
  const input = useRef(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return entries.filter((entry) =>
      terms.every((term) =>
        `${entry.title} ${entry.description} ${entry.tags.join(" ")}`
          .toLowerCase()
          .includes(term),
      ),
    );
  }, [query]);
  const open = () => {
    if (!dialog.current?.open) {
      dialog.current.showModal();
      input.current?.focus();
    }
  };
  const close = () => dialog.current?.close();
  useEffect(() => {
    const keydown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);
  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onClick={open}
        aria-label="Search writing and pages"
        title="Search writing and pages (Ctrl or Command K)"
      >
        <Search size={16} />
        <span>Search</span>
        <kbd>⌘ K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-labelledby="search-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="search-panel">
          <div className="search-heading">
            <h2 id="search-title">Search the notebook</h2>
            <button type="button" onClick={close} aria-label="Close search">
              <X size={20} />
            </button>
          </div>
          <label className="search-input">
            <Search size={19} />
            <span className="sr-only">Search titles, topics, and pages</span>
            <input
              ref={input}
              type="search"
              placeholder="Search writing, topics, and pages…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && results.length) {
                  close();
                  navigate(results[0].path);
                }
              }}
            />
          </label>
          <p className="search-count" aria-live="polite">
            {results.length} {results.length === 1 ? "result" : "results"}
            {query ? ` for “${query}”` : ""}
          </p>
          <div className="search-results">
            {results.map((entry) => {
              const Icon =
                entry.type === "blog"
                  ? BookOpen
                  : entry.type === "article"
                    ? FileText
                    : UserRound;
              return (
                <Link key={entry.path} to={entry.path} onClick={close}>
                  <Icon size={19} />
                  <div>
                    <span className="label">
                      {entry.type === "blog"
                        ? "Learning journal"
                        : entry.type === "article"
                          ? "Technical article"
                          : "Page"}
                    </span>
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                  </div>
                  <ArrowUpRight size={17} />
                </Link>
              );
            })}
            {!results.length && (
              <p className="search-empty">
                No matches yet. Try a topic such as cloud, Linux, or DevSecOps.
              </p>
            )}
          </div>
          <div className="search-footer">
            Searches titles, descriptions, and topics.
            <span>
              <kbd>Esc</kbd> to close
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
