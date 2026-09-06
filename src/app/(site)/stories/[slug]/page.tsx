import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/lib/queries";
import { StitchDivider } from "@/components/site/StitchDivider";

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
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-16 sm:py-20">
      <Link
        href="/stories"
        className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Stories
      </Link>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
          {story.published_date}
        </p>
        <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
          {story.title}
        </h1>
      </div>

      {story.image_url ? (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border/70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.image_url}
            alt={story.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      {paragraphs && paragraphs.length > 0 ? (
        <div className="flex flex-col gap-4 text-lg leading-relaxed text-foreground/80">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-12 text-center">
          <p className="max-w-md font-serif text-xl text-foreground/75 italic">
            &ldquo;{story.excerpt}&rdquo;
          </p>
          <StitchDivider />
          <p className="text-xs font-medium tracking-[0.2em] text-secondary uppercase">
            Full story coming soon
          </p>
        </div>
      )}
    </div>
  );
}
