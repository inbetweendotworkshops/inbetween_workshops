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

export default async function HomePage() {
  const [hero, settings, workshops, stories, gallery] = await Promise.all([
    getHero(),
    getSiteSettings(),
    getWorkshops(),
    getStories(),
    getInstagramGallery(),
  ]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-24 px-6 py-16">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {hero.featured_date} · {hero.featured_location} ·{" "}
            {hero.featured_time}
          </p>
          <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
            {hero.heading}
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            {hero.subheading}
          </p>
        </div>
        {hero.image_url ? (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.image_url}
              alt={hero.heading}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
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
      </section>

      {workshops.length > 0 ? (
        <section className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading text-2xl font-medium">What we run</h2>
            <Link
              href="/workshops"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {workshops.slice(0, 3).map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </section>
      ) : null}

      {stories.length > 0 ? (
        <section className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading text-2xl font-medium">From the journal</h2>
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
      ) : null}

      {gallery.length > 0 ? (
        <section className="flex flex-col gap-8">
          <h2 className="font-heading text-2xl font-medium">On Instagram</h2>
          <InstagramGrid items={gallery.slice(0, 6)} settings={settings} />
        </section>
      ) : null}
    </div>
  );
}
