import { getScheduleEvents, getSiteSettings } from "@/lib/queries";
import { ScheduleItem } from "@/components/site/ScheduleItem";
import { StitchDivider } from "@/components/site/StitchDivider";

export default async function SchedulePage() {
  const [events, settings] = await Promise.all([
    getScheduleEvents(),
    getSiteSettings(),
  ]);

  const featured = settings.schedule_enabled
    ? (events.find((event) => event.is_featured) ?? events[0])
    : undefined;
  const rest = settings.schedule_enabled
    ? events.filter((event) => event.id !== featured?.id)
    : [];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16 sm:py-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
            Schedule
          </h1>
        </div>
        <p className="max-w-xl font-serif text-lg text-foreground/75 italic">
          Small tables, booked in advance. Reach out over WhatsApp or
          Instagram to grab a seat.
        </p>
      </div>

      {featured ? (
        <section className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.2em] text-secondary uppercase">
            Next up
          </p>
          <ScheduleItem event={featured} settings={settings} featured />
        </section>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center">
          <StitchDivider />
          <p className="max-w-sm font-serif text-lg text-foreground/75 italic">
            {settings.schedule_empty_message}
          </p>
        </div>
      )}

      {rest.length > 0 ? (
        <section className="flex flex-col gap-6">
          <p className="text-xs font-medium tracking-[0.2em] text-secondary uppercase">
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
