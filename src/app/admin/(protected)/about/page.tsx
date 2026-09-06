import { adminGetAbout } from "@/lib/admin-queries";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { EditorBanner } from "@/components/admin/EditorBanner";
import { AboutForm } from "@/components/admin/forms/AboutForm";

export default async function AdminAboutPage() {
  const about = await adminGetAbout();
  const section = ADMIN_SECTIONS.find((s) => s.key === "about")!;

  return (
    <div className="flex flex-col gap-6">
      <EditorBanner section={section} />
      <h1 className="text-2xl font-medium">About page</h1>
      <AboutForm initial={about} />
    </div>
  );
}
