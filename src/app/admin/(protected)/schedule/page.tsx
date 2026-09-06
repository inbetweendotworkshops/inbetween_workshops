import { adminGetSchedule, adminGetSettings } from "@/lib/admin-queries";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { EditorBanner } from "@/components/admin/EditorBanner";
import { ScheduleManager } from "@/components/admin/forms/ScheduleManager";
import { ScheduleVisibilityForm } from "@/components/admin/forms/ScheduleVisibilityForm";

export default async function AdminSchedulePage() {
  const [events, settings] = await Promise.all([
    adminGetSchedule(),
    adminGetSettings(),
  ]);
  const section = ADMIN_SECTIONS.find((s) => s.key === "schedule")!;

  return (
    <div className="flex flex-col gap-6">
      <EditorBanner section={section} />
      <h1 className="text-2xl font-medium">Schedule</h1>
      <ScheduleVisibilityForm initial={settings} />
      <ScheduleManager initial={events} />
    </div>
  );
}
