"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

type Paper = {
  slug: string;
  title: string;
  shortTitle: string;
  part: string;
  partLabel: string;
  abstract: string;
  pages: number;
  hasCode: boolean;
  category: string;
  coverImage: string;
  ogImage: string;
  doi: string;
  date: string;
  authors: string[];
  affiliation: string;
};

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  paper: Paper;
  prevPaper: Paper | null;
  nextPaper: Paper | null;
  htmlContent: string;
};

function extractTOC(html: string): TOCItem[] {
  const items: TOCItem[] = [];
  const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "");
    items.push({ id, text, level });
  }
  return items;
}

export default function PaperLayout({ paper, prevPaper, nextPaper, htmlContent }: Props) {
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const tocItems = extractTOC(htmlContent);

  useEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll("h2[id], h3[id]");
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
          const topmost = intersecting.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "-20% 0% -60% 0%" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [htmlContent]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        <Link
          href="/"
          className="transition-colors hover:text-accent-hover"
          style={{ color: "var(--text-muted)" }}
        >
          Papers
        </Link>
        <span>/</span>
        <span style={{ color: "var(--text)" }}>{paper.partLabel}</span>
      </nav>

      <div className="flex gap-8 items-start">
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
          <div
            className="rounded-xl border p-4"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--text-muted)" }}>
              Contents
            </div>
            <nav aria-label="Table of contents">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={"#" + item.id}
                  className="toc-link block py-1"
                  style={{
                    color: activeId === item.id ? "var(--accent-hover)" : "var(--text-muted)",
                    borderLeft: activeId === item.id ? "2px solid var(--accent)" : "2px solid transparent",
                    paddingLeft: item.level === 3 ? "1.25rem" : "0.5rem",
                    fontSize: "0.8rem",
                    transition: "color 0.15s ease",
                  }}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>

          <a
            href={"/pdf/" + paper.slug + ".pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        </aside>

        <article className="flex-1 min-w-0">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(108,92,231,0.15)", color: "var(--accent-hover)" }}
              >
                {paper.partLabel}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {paper.category}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                &middot; {paper.pages} pages
              </span>
              {paper.hasCode && (
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ backgroundColor: "rgba(42,138,94,0.12)", color: "#4ade80" }}
                >
                  + Code
                </span>
              )}
            </div>

            <h1
              className="text-2xl sm:text-3xl font-bold leading-tight mb-4"
              style={{ color: "var(--text)" }}
            >
              {paper.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              <div>
                <span className="font-medium" style={{ color: "var(--text)" }}>
                  {paper.authors.join(", ")}
                </span>
              </div>
              <div>{paper.affiliation}</div>
              <div>{paper.date}</div>
            </div>

            <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              {paper.doi}
            </div>

            <div className="lg:hidden mt-4">
              <button
                onClick={() => setTocOpen((v) => !v)}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded border"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                {tocOpen ? "Hide" : "Show"} Contents
              </button>

              {tocOpen && (
                <div
                  className="mt-2 rounded-lg border p-4"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                >
                  <nav>
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={"#" + item.id}
                        className="block py-1 text-sm"
                        style={{
                          color: "var(--text-muted)",
                          paddingLeft: item.level === 3 ? "1rem" : "0",
                        }}
                        onClick={() => setTocOpen(false)}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>

            <div className="lg:hidden mt-4">
              <a
                href={"/pdf/" + paper.slug + ".pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </header>

          <div
            ref={contentRef}
            className="paper-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
          />

          <nav
            aria-label="Paper navigation"
            className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            {prevPaper ? (
              <Link
                href={"/papers/" + prevPaper.slug + "/"}
                className="flex items-center gap-3 p-4 rounded-lg border flex-1"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: "var(--text-muted)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Previous</div>
                  <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {prevPaper.shortTitle}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextPaper ? (
              <Link
                href={"/papers/" + nextPaper.slug + "/"}
                className="flex items-center justify-end gap-3 p-4 rounded-lg border flex-1 text-right"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              >
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Next</div>
                  <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {nextPaper.shortTitle}
                  </div>
                </div>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: "var(--text-muted)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}
