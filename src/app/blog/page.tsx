import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPostsMeta, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Writing — Harry Was Here',
  description: 'How I think, build, and take things apart.',
};

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="min-h-[100dvh] bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-28 lg:px-8">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-white/45 transition-colors hover:text-white"
        >
          ← home
        </Link>

        <header className="mt-10">
          <h1 className="font-mono text-4xl font-bold tracking-tight lg:text-5xl">Writing</h1>
          <p className="mt-3 text-white/55">How I think, build, and take things apart.</p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-20 font-mono text-sm text-white/40">No posts yet.</p>
        ) : (
          <ul className="mt-16 border-t border-white/10">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-white/10">
                <Link href={`/blog/${p.slug}`} className="group block py-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-mono text-lg text-white/90 transition-colors group-hover:text-white">
                      {p.title}
                    </h2>
                    <time className="shrink-0 font-mono text-xs text-white/40">
                      {formatDate(p.date)}
                    </time>
                  </div>
                  {p.excerpt && <p className="mt-2 max-w-xl text-sm text-white/55">{p.excerpt}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
