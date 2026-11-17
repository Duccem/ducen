import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/sections/contact";
import { formatPostDate, getPostBySlug } from "@/lib/blog";
import { CAL_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, await getLocale());
  if (!post) {
    return {};
  }

  const images = [post.cover ?? "/opengraph-image"];

  return {
    title: `${post.title} | José Véliz`,
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
  const locale = await getLocale();
  const post = getPostBySlug(slug, locale);
  if (!post) {
    notFound();
  }

  const t = await getTranslations("blog");

  return (
    <>
      <Navigation />
      <main className="page-x pt-[clamp(64px,8vw,120px)] pb-[clamp(96px,12vw,180px)]">
        <article className="max-w-[46rem] mx-auto">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-body text-soft hover:text-ink transition-colors"
          >
            <span
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1"
            >
              ←
            </span>
            {t("backToBlog")}
          </Link>

          <header className="mt-12 mb-14" lang={post.locale}>
            <h1
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
              className="text-[clamp(30px,3.4vw,48px)] tracking-[-0.04em] leading-[1.05]"
            >
              {post.title}
            </h1>
            {post.description && (
              <p
                data-reveal
                style={{ "--i": 2 } as React.CSSProperties}
                className="mt-8 text-lead leading-[1.4]"
              >
                {post.description}
              </p>
            )}
            <p className="mt-8 text-small text-soft">
              <time dateTime={post.date}>
                {formatPostDate(post.date, locale)}
              </time>{" "}
              · {t("readingTime", { minutes: post.readingMinutes })}
              {post.tags.length > 0 && ` · ${post.tags.join(", ")}`}
            </p>
          </header>

          {post.cover && (
            // biome-ignore lint/performance/noImgElement: covers come from markdown frontmatter and may be remote
            <img
              src={post.cover}
              alt=""
              className="w-full aspect-video object-cover mb-14"
            />
          )}

          <div
            lang={post.locale}
            className="prose prose-invert prose-lg max-w-none
              prose-p:text-ink prose-li:text-ink prose-strong:text-ink
              prose-headings:font-semibold prose-headings:tracking-[-0.03em] prose-headings:scroll-mt-10 prose-headings:text-ink
              prose-a:text-ink prose-a:underline-offset-4
              prose-hr:hidden
              prose-pre:rounded-none prose-pre:bg-surface prose-pre:text-ink
              prose-code:text-ink prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-accent prose-blockquote:text-ink"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>

      <section className="bg-paper text-paper-ink page-x py-[clamp(80px,10vw,140px)]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <h2 className="text-[clamp(40px,6vw,96px)] tracking-[-0.05em] leading-[0.92] max-w-[14ch]">
              {t("ctaTitle")}
            </h2>
            <p className="mt-6 text-[17px] md:text-[20px]">
              {t("ctaDescription")}
            </p>
          </div>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="btn min-h-14 w-full md:w-auto"
          >
            {t("ctaButton")}
            <span aria-hidden="true" className="btn-arrow">
              →
            </span>
          </a>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
