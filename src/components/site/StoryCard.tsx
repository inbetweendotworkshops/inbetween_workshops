import type { Story } from "@/lib/types";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="flex flex-col gap-4 sm:flex-row">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted sm:w-48 sm:shrink-0">
        {story.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={story.image_url}
            alt={story.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-muted-foreground">{story.published_date}</p>
        <h3 className="font-heading text-lg font-medium">{story.title}</h3>
        <p className="text-sm text-muted-foreground">{story.excerpt}</p>
        {!story.body ? (
          <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
            Full story coming soon
          </p>
        ) : null}
      </div>
    </article>
  );
}
