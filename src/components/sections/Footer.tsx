export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-8 font-mono text-white lg:px-12">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center text-xs text-white/45">
        <p>
          Created by{' '}
          <span className="text-white">
            &lt;Har<span className="text-white/40">/</span>ry&gt;
          </span>{' '}
          · {year}
        </p>
      </div>
    </footer>
  );
}
