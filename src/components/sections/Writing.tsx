import Link from 'next/link';
import { getAllPostsMeta, formatDate } from '@/lib/blog';

export function Writing() {
  const posts = getAllPostsMeta().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-32 lg:px-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-3xl font-bold tracking-tight lg:text-4xl">Writing</h2>
          <Link
            href="/blog"
            className="shrink-0 font-mono text-xs uppercase tracking-widest text-white/45 transition-colors hover:text-white"
          >
            All posts →
          </Link>
        </div>

        <ul className="mt-12 border-t border-white/10">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-white/10">
              <Link
                href={`/blog/${p.slug}`}
                className="group flex items-baseline justify-between gap-6 py-6"
              >
                <span className="font-mono text-base text-white/80 transition-colors group-hover:text-white">
                  {p.title}
                </span>
                <time className="shrink-0 font-mono text-xs text-white/40">
                  {formatDate(p.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
