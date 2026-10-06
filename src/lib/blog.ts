import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

export type PostMeta = {
  slug: string;
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
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    console.warn(`[blog] "${fileName}" needs "title" and "date" frontmatter.`);
    return null;
  }

  const words = content.trim().split(/\s+/).length;

  return {
    slug,
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

const readAllPosts = () => {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readPost)
    .filter((post) => post !== null)
    .filter((post) => !post.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => b.date.localeCompare(a.date));
};

export const getAllPosts = (): PostMeta[] =>
  readAllPosts().map(({ content: _content, draft: _draft, ...meta }) => meta);

export const getPostBySlug = (slug: string): Post | null => {
  const post = readAllPosts().find((item) => item.slug === slug);
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
