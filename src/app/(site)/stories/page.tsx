import { getStories } from "@/lib/queries";
import { StoryCard } from "@/components/site/StoryCard";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-medium tracking-tight">Stories</h1>
        <p className="max-w-xl text-muted-foreground">
          Notes from the workshop table.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
