import { adminGetSettings } from "@/lib/admin-queries";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { EditorBanner } from "@/components/admin/EditorBanner";
import { SettingsForm } from "@/components/admin/forms/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await adminGetSettings();
  const section = ADMIN_SECTIONS.find((s) => s.key === "settings")!;

  return (
    <div className="flex flex-col gap-6">
      <EditorBanner section={section} />
      <h1 className="text-2xl font-medium">Site settings</h1>
      <SettingsForm initial={settings} />
    </div>
  );
}
