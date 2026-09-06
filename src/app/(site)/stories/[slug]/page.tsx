import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/lib/queries";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) notFound();

  const paragraphs = story.body?.split("\n").filter((p) => p.trim() !== "");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-16">
      <Link
        href="/stories"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Stories
      </Link>

      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">{story.published_date}</p>
        <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
          {story.title}
        </h1>
      </div>

      {story.image_url ? (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.image_url}
            alt={story.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      {paragraphs && paragraphs.length > 0 ? (
        <div className="flex flex-col gap-4 text-base text-muted-foreground">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-base text-muted-foreground">{story.excerpt}</p>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Full story coming soon
          </p>
        </div>
      )}
    </div>
  );
}
