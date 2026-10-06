import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = await getLocale();
  const [featured, ...rest] = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 lg:px-20 pt-40 pb-32">
        {/* Header */}
        <header className="mb-20 max-w-3xl animate-fade-up">
          <span className="font-mono text-sm text-muted-foreground">
            &lt;{t("eyebrow")} /&gt;
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight">
            {t("title")}
            <br />
            <span className="italic font-normal">{t("titleEmphasis")}</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </header>

        {!featured && (
          <p className="py-20 text-center text-muted-foreground border-t border-border">
            {t("empty")}
          </p>
        )}

        {/* Featured Post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-8 animate-fade-in-delay-1 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <article className="relative overflow-hidden rounded-3xl bg-foreground text-background grid lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-background/60">
                    <span className="px-3 py-1 rounded-full bg-background text-foreground">
                      {t("featured")}
                    </span>
                    <time dateTime={featured.date}>
                      {formatPostDate(featured.date, locale)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>
                      {t("readingTime", { minutes: featured.readingMinutes })}
                    </span>
                  </div>
                  <h2 className="mt-8 text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight leading-tight">
                    {featured.title}
                  </h2>
                  <p className="mt-6 text-background/70 text-lg leading-relaxed">
                    {featured.description}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-6">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium border border-background/20 text-background/80 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="shrink-0 w-12 h-12 rounded-full border border-background/30 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-all duration-300">
                    <ArrowUpRight
                      size={20}
                      className="group-hover:rotate-45 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
              <div className="relative min-h-64 lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-background/10">
                {featured.cover ? (
                  // biome-ignore lint/performance/noImgElement: covers come from markdown frontmatter and may be remote
                  <img
                    src={featured.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_60%)]"
                  >
                    <span className="font-mono text-[10rem] leading-none font-semibold text-background/10 transition-transform duration-700 group-hover:scale-110">
                      {"{ }"}
                    </span>
                  </div>
                )}
              </div>
            </article>
          </Link>
        )}

        {/* Posts Grid */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in-delay-2">
            {rest.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                <article className="elegant-card h-full flex flex-col overflow-hidden group-hover:border-foreground group-hover:-translate-y-1 group-hover:shadow-xl">
                  {post.cover && (
                    <div className="aspect-video overflow-hidden border-b border-border">
                      {/* biome-ignore lint/performance/noImgElement: covers come from markdown frontmatter and may be remote */}
                      <img
                        src={post.cover}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                      <span>&lt;{String(index + 2).padStart(2, "0")}&gt;</span>
                      <time dateTime={post.date}>
                        {formatPostDate(post.date, locale)}
                      </time>
                    </div>
                    <h2 className="mt-6 text-2xl font-display font-semibold tracking-tight leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium border border-border rounded-full text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-8 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("readingTime", { minutes: post.readingMinutes })}
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        {t("readArticle")}
                        <ArrowUpRight
                          size={16}
                          className="group-hover:rotate-45 transition-transform duration-300"
                        />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
