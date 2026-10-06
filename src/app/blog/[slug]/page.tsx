import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { formatPostDate, getPostBySlug } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  const images = [post.cover ?? "/opengraph-image"];

  return {
    title: `${post.title} | Jose Veliz`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const t = await getTranslations("blog");
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 lg:px-20 pt-36 pb-32">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            {t("backToBlog")}
          </Link>

          {/* Header */}
          <header className="mt-10 mb-12 animate-fade-up">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium border border-border rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-tight">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            )}
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <time dateTime={post.date}>
                {formatPostDate(post.date, locale)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
            </div>
          </header>

          {post.cover && (
            // biome-ignore lint/performance/noImgElement: covers come from markdown frontmatter and may be remote
            <img
              src={post.cover}
              alt=""
              className="w-full aspect-video object-cover rounded-2xl border border-border mb-12"
            />
          )}

          {/* Content */}
          <div className="prose prose-neutral prose-lg max-w-none animate-fade-in-delay-1 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-28 prose-a:underline-offset-4 prose-img:rounded-2xl prose-pre:rounded-2xl prose-pre:bg-foreground prose-pre:text-background">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer CTA */}
          <footer className="mt-20 p-8 md:p-12 rounded-3xl bg-foreground text-background flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold">
                {t("ctaTitle")}
              </h2>
              <p className="mt-2 text-background/70">{t("ctaDescription")}</p>
            </div>
            <Button variant="heroLight" size="lg" className="group" asChild>
              <a
                href="https://cal.com/jose-manuel-veliz/15min"
                target="_blank"
                rel="noreferrer"
              >
                {t("ctaButton")}
                <ArrowUpRight
                  size={18}
                  className="group-hover:rotate-45 transition-transform"
                />
              </a>
            </Button>
          </footer>
        </article>
      </main>
    </div>
  );
}
