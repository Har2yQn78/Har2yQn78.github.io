import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      {/* Next sections mount below. */}
      <Footer />
    </main>
  );
}
