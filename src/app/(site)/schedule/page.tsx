import { getScheduleEvents, getSiteSettings } from "@/lib/queries";
import { ScheduleItem } from "@/components/site/ScheduleItem";

export default async function SchedulePage() {
  const [events, settings] = await Promise.all([
    getScheduleEvents(),
    getSiteSettings(),
  ]);

  const featured = events.find((event) => event.is_featured) ?? events[0];
  const rest = events.filter((event) => event.id !== featured?.id);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-medium tracking-tight">Schedule</h1>
        <p className="max-w-xl text-muted-foreground">
          Small tables, booked in advance. Reach out over WhatsApp or
          Instagram to grab a seat.
        </p>
      </div>

      {featured ? (
        <section className="flex flex-col gap-4">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Next up
          </p>
          <ScheduleItem event={featured} settings={settings} featured />
        </section>
      ) : (
        <p className="text-muted-foreground">
          No sessions scheduled right now — check back soon.
        </p>
      )}

      {rest.length > 0 ? (
        <section className="flex flex-col gap-6">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Upcoming
          </p>
          <div className="flex flex-col gap-6">
            {rest.map((event) => (
              <ScheduleItem key={event.id} event={event} settings={settings} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
