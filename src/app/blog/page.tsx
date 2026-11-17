import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/sections/contact";
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
  const [featured, ...rest] = getAllPosts(locale);

  return (
    <>
      <Navigation />
      <main className="page-x pt-[clamp(80px,10vw,160px)] pb-[clamp(120px,14vw,220px)]">
        <header className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6 items-end">
          <h1
            data-reveal
            className="md:col-span-8 text-[16vw] md:text-[clamp(80px,10vw,180px)] tracking-[-0.055em] leading-[0.85]"
          >
            {t("title")}
          </h1>
          <p
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="md:col-start-9 md:col-span-4 text-lead leading-[1.35]"
          >
            {t("description")}
          </p>
        </header>

        {!featured && <p className="mt-24 text-body text-soft">{t("empty")}</p>}

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
            className="group mt-[clamp(64px,8vw,120px)] block bg-surface hover:bg-surface-2 transition-colors"
          >
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-x-6">
              <div className="lg:col-span-8 p-6 md:p-12 flex flex-col gap-10">
                <h2 className="text-lead md:text-[clamp(30px,3vw,44px)] tracking-[-0.04em] leading-[1.05] max-w-[34ch]">
                  {featured.title}
                </h2>
                <p className="text-body max-w-[60ch] line-clamp-3">
                  {featured.description}
                </p>
                <p className="text-small text-soft">
                  {t("featured")} ·{" "}
                  <time dateTime={featured.date}>
                    {formatPostDate(featured.date, locale)}
                  </time>{" "}
                  · {t("readingTime", { minutes: featured.readingMinutes })}
                </p>
                <span className="inline-flex items-center gap-2 text-body">
                  {t("readArticle")}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
              {featured.cover && (
                <div className="lg:col-span-4 relative min-h-64 overflow-hidden">
                  {/* biome-ignore lint/performance/noImgElement: covers come from markdown frontmatter and may be remote */}
                  <img
                    src={featured.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
            </article>
          </Link>
        )}

        {rest.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {rest.map((post, i) => (
              <li
                key={post.slug}
                data-reveal
                style={{ "--i": i + 3 } as React.CSSProperties}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group h-full flex flex-col gap-6 bg-surface hover:bg-surface-2 transition-colors p-6 md:p-10"
                >
                  <h2 className="text-lead font-semibold tracking-[-0.03em] leading-[1.1]">
                    {post.title}
                  </h2>
                  <p className="text-body line-clamp-3">{post.description}</p>
                  <p className="text-small text-soft">
                    <time dateTime={post.date}>
                      {formatPostDate(post.date, locale)}
                    </time>{" "}
                    · {t("readingTime", { minutes: post.readingMinutes })}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-body">
                    {t("readArticle")}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
