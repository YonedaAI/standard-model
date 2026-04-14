import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import papers from "./data/papers.json";

export const metadata: Metadata = {
  title: "Standard Model — Modular Physics Framework",
  description:
    "A four-paper research series presenting the Standard Model of particle physics through modular composition: matter, anti-matter, gauge synthesis, and unified structure.",
  openGraph: {
    title: "Standard Model — Modular Physics Framework",
    description:
      "A four-paper research series presenting the Standard Model of particle physics through modular composition.",
    images: [{ url: "/og/unified-synthesis-og.png", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="hero-bg absolute inset-0 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="badge-accent text-xs font-medium px-3 py-1 rounded-full border">
              GrokRxiv &middot; hep-ph &middot; April 2026
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-main">
            The Standard Model
            <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 font-semibold text-accent-color">
              as Modular Composition
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed text-muted">
            A four-paper research series presenting the Standard Model of
            particle physics through hierarchical modular composition — from
            fundamental matter to unified gauge structure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-sm">
            {["Law I: Size-Aware", "Law II: Thermal", "Law III: Quantum", "Law IV: Gravitational"].map(
              (law, i, arr) => (
                <span key={law} className="flex items-center gap-2">
                  <span className="tag-accent px-2 py-0.5 rounded text-xs">{law}</span>
                  {i < arr.length - 1 && <span className="text-muted">&rarr;</span>}
                </span>
              )
            )}
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted">
            <div className="text-center">
              <div className="text-2xl font-bold text-main">4</div>
              <div>Papers</div>
            </div>
            <div className="divider-v w-px h-8" />
            <div className="text-center">
              <div className="text-2xl font-bold text-main">111</div>
              <div>Pages</div>
            </div>
            <div className="divider-v w-px h-8" />
            <div className="text-center">
              <div className="text-2xl font-bold text-main">Matthew Long</div>
              <div>Author</div>
            </div>
          </div>
        </div>
      </section>

      {/* Papers grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-main">Research Papers</h2>
          <div className="text-sm text-muted">{papers.length} papers in this series</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {papers.map((paper) => (
            <PaperCard key={paper.slug} paper={paper} />
          ))}
        </div>
      </section>

      {/* Framework section */}
      <section className="border-t border-b py-16 section-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-main">
            The Modular Physics Framework
          </h2>
          <p className="text-base leading-relaxed mb-8 text-muted">
            Physical laws compose hierarchically, with each level producing emergent properties
            absent from lower levels. This series traces the composition from scale-aware
            kinematics through thermal statistical mechanics, quantum gauge field theory,
            and toward the gravitational frontier.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {[
              { law: "Law I", name: "Size-Aware", desc: "Characteristic scales & kinematics" },
              { law: "Law II", name: "Thermal", desc: "Statistical mechanics & phases" },
              { law: "Law III", name: "Quantum", desc: "Gauge fields & interactions" },
              { law: "Law IV", name: "Gravitational", desc: "Open frontier of unification" },
            ].map((item) => (
              <div key={item.law} className="law-card rounded-lg p-4 border text-left">
                <div className="text-xs font-medium mb-1 text-accent-color">{item.law}</div>
                <div className="font-semibold text-sm mb-1 text-main">{item.name}</div>
                <div className="text-xs text-muted">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

type Paper = (typeof papers)[number];

function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="paper-card group rounded-xl border overflow-hidden flex flex-col">
      <div className="relative w-full overflow-hidden cover-aspect">
        <Image
          src={paper.coverImage}
          alt={"Cover for " + paper.shortTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-2 left-2">
          <span className="part-badge text-xs font-semibold px-2 py-0.5 rounded">
            {paper.partLabel}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-3 text-main">
          {paper.shortTitle}
        </h3>

        <p className="text-xs leading-relaxed mb-4 flex-1 line-clamp-4 text-muted">
          {paper.abstract}
        </p>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="tag-accent text-xs px-2 py-0.5 rounded">{paper.category}</span>
          <span className="text-xs text-muted">{paper.pages} pages</span>
          {paper.hasCode && (
            <span className="tag-green text-xs px-2 py-0.5 rounded">+ Code</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={"/papers/" + paper.slug + "/"}
            className="card-btn-primary flex-1 text-center text-xs font-medium py-2 rounded-md"
          >
            Read
          </Link>
          <a
            href={"/pdf/" + paper.slug + ".pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="card-btn-secondary flex-1 text-center text-xs font-medium py-2 rounded-md border"
          >
            PDF
          </a>
        </div>
      </div>
    </article>
  );
}
