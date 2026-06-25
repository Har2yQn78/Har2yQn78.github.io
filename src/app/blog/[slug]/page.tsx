import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSlugs, getPost, formatDate } from '@/lib/blog';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Harry Was Here`, description: post.excerpt };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-[100dvh] bg-black text-white">
      <article className="mx-auto max-w-2xl px-6 py-24 lg:px-8">
        <Link
          href="/blog"
          className="font-mono text-xs uppercase tracking-widest text-white/45 transition-colors hover:text-white"
        >
          ← writing
        </Link>

        <header className="mt-10">
          <h1 className="font-mono text-3xl font-bold leading-tight tracking-tight lg:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 font-mono text-xs text-white/40">
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="prose-blog mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />

        <div className="mt-16 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:border-white/60 hover:text-white active:scale-[0.98]"
          >
            ← home
          </Link>
        </div>
      </article>
    </main>
  );
}
