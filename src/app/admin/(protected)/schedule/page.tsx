import { adminGetSchedule } from "@/lib/admin-queries";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { EditorBanner } from "@/components/admin/EditorBanner";
import { ScheduleManager } from "@/components/admin/forms/ScheduleManager";

export default async function AdminSchedulePage() {
  const events = await adminGetSchedule();
  const section = ADMIN_SECTIONS.find((s) => s.key === "schedule")!;

  return (
    <div className="flex flex-col gap-6">
      <EditorBanner section={section} />
      <h1 className="text-2xl font-medium">Schedule</h1>
      <ScheduleManager initial={events} />
    </div>
  );
}
