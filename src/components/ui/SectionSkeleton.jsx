import { Container } from '../layout/Container';

const BASE = 'animate-pulse rounded-sm bg-ink-200/60';

export function HeroSkeleton() {
  return (
    <section className="overflow-x-clip py-12 md:py-20" aria-hidden>
      <Container className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0 space-y-6">
          <div className={`${BASE} h-3 w-48`} />
          <div className="space-y-3">
            <div className={`${BASE} h-9 w-full max-w-[20ch]`} />
            <div className={`${BASE} h-9 w-full max-w-[26ch]`} />
            <div className={`${BASE} h-9 w-2/3 max-w-[16ch]`} />
          </div>
          <div className="space-y-2">
            <div className={`${BASE} h-5 w-full max-w-[52ch]`} />
            <div className={`${BASE} h-5 w-4/5 max-w-[44ch]`} />
          </div>
          <div className="flex gap-4 pt-2">
            <div className={`${BASE} h-12 w-36`} />
            <div className={`${BASE} h-6 w-56`} />
          </div>
        </div>
        <figure className="min-w-0">
          <picture className="block">
            <source srcSet="/yaroslav.avif" type="image/avif" />
            <source srcSet="/yaroslav.webp" type="image/webp" />
            <img
              src="/yaroslav.jpg"
              alt=""
              width="800"
              height="1000"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-[0_40px_80px_-30px_rgba(10,10,10,0.35)] md:aspect-auto md:h-[440px]"
            />
          </picture>
        </figure>
      </Container>
    </section>
  );
}

function PlainSection({ height = 'min-h-[480px]', bg = 'bg-paper' }) {
  return (
    <section className={`${bg} py-16 md:py-24 ${height}`} aria-hidden>
      <Container>
        <div className={`${BASE} h-3 w-32`} />
        <div className={`${BASE} mt-4 h-9 w-72`} />
        <div className={`${BASE} mt-12 h-32 w-full max-w-2xl`} />
      </Container>
    </section>
  );
}

export const HelpWithSkeleton = () => <PlainSection bg="bg-paper" />;
export const ServicesSkeleton = () => <PlainSection bg="bg-paper-2" />;
export const TrustSkeleton = () => <PlainSection bg="bg-paper" />;
export const CTASkeleton = () => (
  <section className="bg-ink-800 py-20 md:py-28 min-h-[320px]" aria-hidden />
);
export const BlogSkeleton = () => <PlainSection bg="bg-paper" height="min-h-[420px]" />;
export const FAQSkeleton = () => <PlainSection bg="bg-paper-2" height="min-h-[520px]" />;
