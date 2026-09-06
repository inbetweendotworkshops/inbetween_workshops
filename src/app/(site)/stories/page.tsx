import { getStories } from "@/lib/queries";
import { StoryCard } from "@/components/site/StoryCard";
import { StitchDivider } from "@/components/site/StitchDivider";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-14 px-6 py-16 sm:py-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
            Stories
          </h1>
        </div>
        <p className="max-w-xl font-serif text-lg text-foreground/75 italic">
          Notes from the workshop table.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {stories.map((story, i) => (
          <div key={story.id} className="flex flex-col gap-12">
            {i > 0 ? <StitchDivider /> : null}
            <StoryCard story={story} />
          </div>
        ))}
      </div>
    </div>
  );
}
