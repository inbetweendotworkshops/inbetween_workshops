import { adminGetStories } from "@/lib/admin-queries";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { EditorBanner } from "@/components/admin/EditorBanner";
import { StoriesManager } from "@/components/admin/forms/StoriesManager";

export default async function AdminStoriesPage() {
  const stories = await adminGetStories();
  const section = ADMIN_SECTIONS.find((s) => s.key === "stories")!;

  return (
    <div className="flex flex-col gap-6">
      <EditorBanner section={section} />
      <h1 className="text-2xl font-medium">Stories</h1>
      <StoriesManager initial={stories} />
    </div>
  );
}
