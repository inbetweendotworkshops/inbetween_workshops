import { adminGetWorkshops } from "@/lib/admin-queries";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { EditorBanner } from "@/components/admin/EditorBanner";
import { WorkshopsManager } from "@/components/admin/forms/WorkshopsManager";

export default async function AdminWorkshopsPage() {
  const workshops = await adminGetWorkshops();
  const section = ADMIN_SECTIONS.find((s) => s.key === "workshops")!;

  return (
    <div className="flex flex-col gap-6">
      <EditorBanner section={section} />
      <h1 className="text-2xl font-medium">Workshops</h1>
      <WorkshopsManager initial={workshops} />
    </div>
  );
}
