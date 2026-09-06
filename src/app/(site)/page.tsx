import Link from "next/link";
import {
  getHero,
  getInstagramGallery,
  getSiteSettings,
  getStories,
  getWorkshops,
} from "@/lib/queries";
import { BookButton } from "@/components/site/BookButton";
import { WorkshopCard } from "@/components/site/WorkshopCard";
import { StoryCard } from "@/components/site/StoryCard";
import { InstagramGrid } from "@/components/site/InstagramGrid";
import { StitchDivider } from "@/components/site/StitchDivider";

export default async function HomePage() {
  const [hero, settings, workshops, stories, gallery] = await Promise.all([
    getHero(),
    getSiteSettings(),
    getWorkshops(),
    getStories(),
    getInstagramGallery(),
  ]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-20 px-6 py-16 sm:py-20">
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-secondary" aria-hidden="true" />
            <p className="text-xs font-medium tracking-[0.2em] text-secondary uppercase">
              Next workshop
            </p>
          </div>
          <h1 className="font-heading text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
            {hero.heading}
          </h1>
          <p className="text-sm text-muted-foreground">
            {hero.featured_date} · {hero.featured_location} ·{" "}
            {hero.featured_time}
          </p>
          <p className="font-serif text-xl leading-relaxed text-foreground/80 italic">
            {hero.subheading}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-5">
            <BookButton
              settings={settings}
              context={hero.featured_title}
              label={hero.primary_cta_label}
            />
            <Link
              href={hero.secondary_cta_link}
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {hero.secondary_cta_label} →
            </Link>
          </div>
        </div>

        {hero.image_url ? (
          <div className="relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-4 -bottom-4 -left-4 -z-10 rounded-[2rem] border border-secondary/40 sm:-top-6 sm:-right-6 sm:-bottom-6 sm:-left-6"
            />
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_-25px_oklch(0.33_0.06_152_/_0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.image_url}
                alt={hero.heading}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </section>

      <StitchDivider />

      {workshops.length > 0 ? (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium tracking-[0.2em] text-secondary uppercase">
              Workshops
            </p>
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-2xl font-medium sm:text-3xl">
                What we run
              </h2>
              <Link
                href="/workshops"
                className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
              >
                See all →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {workshops.slice(0, 3).map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
          <Link
            href="/workshops"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            See all →
          </Link>
        </section>
      ) : null}

      {stories.length > 0 ? (
        <>
          <StitchDivider />
          <section className="flex flex-col gap-8">
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-2xl font-medium sm:text-3xl">
                From the journal
              </h2>
              <Link
                href="/stories"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                See all →
              </Link>
            </div>
            <div className="flex flex-col gap-10">
              {stories.slice(0, 3).map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        </>
      ) : null}

      {gallery.length > 0 ? (
        <>
          <StitchDivider />
          <section className="flex flex-col gap-8">
            <h2 className="font-heading text-2xl font-medium sm:text-3xl">
              On Instagram
            </h2>
            <InstagramGrid items={gallery.slice(0, 6)} settings={settings} />
          </section>
        </>
      ) : null}
    </div>
  );
}
