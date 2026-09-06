import Link from "next/link";
import type { Story } from "@/lib/types";

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex flex-col gap-4 sm:flex-row"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border/70 sm:w-48 sm:shrink-0">
        {story.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={story.image_url}
            alt={story.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
          {story.published_date}
        </p>
        <h3 className="font-heading text-lg font-medium underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-current">
          {story.title}
        </h3>
        <p className="font-serif text-base text-foreground/75 italic">
          {story.excerpt}
        </p>
        {!story.body ? (
          <p className="mt-1 text-xs tracking-wide text-secondary uppercase">
            Full story coming soon
          </p>
        ) : null}
      </div>
    </Link>
  );
}
