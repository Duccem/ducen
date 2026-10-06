import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;
const DEFAULT_LOCALE = "es";
// "<slug>.<locale>.md" is a translation; "<slug>.md" is the default locale.
const FILE_NAME_PATTERN = /^(.+?)(?:\.(es|en))?\.md$/;

export type PostMeta = {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

const toIsoDate = (value: unknown): string => {
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
};

const readPost = (fileName: string): (Post & { draft: boolean }) | null => {
  const match = fileName.match(FILE_NAME_PATTERN);
  if (!match) {
    return null;
  }

  const [, slug, locale = DEFAULT_LOCALE] = match;
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    console.warn(`[blog] "${fileName}" needs "title" and "date" frontmatter.`);
    return null;
  }

  const words = content.trim().split(/\s+/).length;

  return {
    slug,
    locale,
    title: String(data.title),
    description: data.description ? String(data.description) : "",
    date: toIsoDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    draft: data.draft === true,
    content,
  };
};

// One post per slug: the requested locale, falling back to the default locale
// and then to whatever translation exists.
const readAllPosts = (locale: string) => {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const versions = fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readPost)
    .filter((post) => post !== null)
    .filter((post) => !post.draft || process.env.NODE_ENV !== "production");

  const rank = (post: { locale: string }) =>
    post.locale === locale ? 0 : post.locale === DEFAULT_LOCALE ? 1 : 2;
  const bySlug = new Map<string, (typeof versions)[number]>();
  for (const post of versions) {
    const current = bySlug.get(post.slug);
    if (!current || rank(post) < rank(current)) {
      bySlug.set(post.slug, post);
    }
  }

  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
};

export const getAllPosts = (locale: string): PostMeta[] =>
  readAllPosts(locale).map(
    ({ content: _content, draft: _draft, ...meta }) => meta,
  );

export const getPostBySlug = (slug: string, locale: string): Post | null => {
  const post = readAllPosts(locale).find((item) => item.slug === slug);
  if (!post) {
    return null;
  }

  const { draft: _draft, ...rest } = post;
  return rest;
};

export const formatPostDate = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
