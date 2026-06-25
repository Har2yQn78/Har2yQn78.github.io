import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  readingTime: string;
  tags?: string[];
};

export type Post = PostMeta & { html: string };

function blogFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
}

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function toMeta(file: string): PostMeta {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
    excerpt: data.excerpt ?? '',
    readingTime: readingTime(content),
    tags: data.tags,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  return blogFiles()
    .map(toMeta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllSlugs(): string[] {
  return blogFiles().map((f) => f.replace(/\.md$/, ''));
}

async function renderMarkdown(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: 'github-dark', keepBackground: true })
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { content } = matter(raw);
  return {
    ...toMeta(`${slug}.md`),
    html: await renderMarkdown(content),
  };
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}
