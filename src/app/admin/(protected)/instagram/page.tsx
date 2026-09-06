import { adminGetInstagramGallery } from "@/lib/admin-queries";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { EditorBanner } from "@/components/admin/EditorBanner";
import { InstagramGalleryManager } from "@/components/admin/forms/InstagramGalleryManager";

export default async function AdminInstagramPage() {
  const items = await adminGetInstagramGallery();
  const section = ADMIN_SECTIONS.find((s) => s.key === "instagram")!;

  return (
    <div className="flex flex-col gap-6">
      <EditorBanner section={section} />
      <h1 className="text-2xl font-medium">Instagram grid</h1>
      <InstagramGalleryManager initial={items} />
    </div>
  );
}
