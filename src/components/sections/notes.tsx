import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export const NotesSection = async () => {
  const t = await getTranslations("notes");
  const tb = await getTranslations("blog");
  const locale = await getLocale();
  const posts = getAllPosts(locale).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="notes" className="page-x pb-[clamp(120px,14vw,220px)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10">
        <div className="md:col-span-4">
          <h2 data-reveal className="text-head tracking-[-0.04em]">
            {t("title")}
          </h2>
          <Link
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            href="/blog"
            className="mt-6 inline-block text-link text-body"
          >
            {t("all")}
          </Link>
        </div>

        <ul className="md:col-start-5 md:col-span-8 flex flex-col gap-4">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              data-reveal
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-surface hover:bg-surface-2 transition-colors p-6 md:p-8"
              >
                <p className="text-lead font-semibold tracking-[-0.03em] leading-[1.15] max-w-[40ch]">
                  {post.title}
                </p>
                <p className="mt-3 text-small text-soft">
                  <time dateTime={post.date}>
                    {formatPostDate(post.date, locale)}
                  </time>
                  {" · "}
                  {tb("readingTime", { minutes: post.readingMinutes })}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-body">
                  {tb("readArticle")}
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
      </div>
    </section>
  );
};
