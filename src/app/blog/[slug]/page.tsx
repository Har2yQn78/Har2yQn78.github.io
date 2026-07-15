import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSlugs, getAllPostsMeta, getPost, formatDate } from '@/lib/blog';
import { ReadingProgress } from '@/components/ui/ReadingProgress';

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
  const url = `/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og.png"],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Chronological neighbours (list is sorted newest-first).
  const all = getAllPostsMeta();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = i > 0 ? all[i - 1] : null;
  const older = i >= 0 && i < all.length - 1 ? all[i + 1] : null;

  return (
    <main className="min-h-[100dvh] bg-black text-white">
      <ReadingProgress />
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

        {(newer || older) && (
          <nav
            aria-label="More writing"
            className="mt-20 grid gap-px border-t border-white/10 pt-8 sm:grid-cols-2"
          >
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="group flex flex-col gap-1 py-4 sm:pr-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                  ← Older
                </span>
                <span className="font-mono text-sm text-white/80 transition-colors group-hover:text-ctos">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="group flex flex-col gap-1 py-4 sm:items-end sm:border-l sm:border-white/10 sm:pl-6 sm:text-right"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Newer →
                </span>
                <span className="font-mono text-sm text-white/80 transition-colors group-hover:text-ctos">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        <div className="mt-10 border-t border-white/10 pt-8">
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
