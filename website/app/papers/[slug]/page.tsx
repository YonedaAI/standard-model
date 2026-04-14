import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import papers from "../../data/papers.json";
import { getPaperContent } from "../../lib/paperContent";
import PaperLayout from "../../components/PaperLayout";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paper = papers.find((p) => p.slug === params.slug);
  if (!paper) return {};

  return {
    title: paper.shortTitle,
    description: paper.abstract.slice(0, 200),
    openGraph: {
      title: paper.title,
      description: paper.abstract.slice(0, 200),
      images: [{ url: paper.ogImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: paper.title,
      description: paper.abstract.slice(0, 200),
      images: [paper.ogImage],
    },
  };
}

export default function PaperPage({ params }: Props) {
  const paperIndex = papers.findIndex((p) => p.slug === params.slug);
  if (paperIndex === -1) notFound();

  const paper = papers[paperIndex];
  const prevPaper = paperIndex > 0 ? papers[paperIndex - 1] : null;
  const nextPaper = paperIndex < papers.length - 1 ? papers[paperIndex + 1] : null;
  const htmlContent = getPaperContent(params.slug);

  return (
    <PaperLayout
      paper={paper}
      prevPaper={prevPaper}
      nextPaper={nextPaper}
      htmlContent={htmlContent}
    />
  );
}
