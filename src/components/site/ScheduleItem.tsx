import { Badge } from "@/components/ui/badge";
import { BookButton } from "@/components/site/BookButton";
import type { ScheduleEvent, SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusLabel: Record<ScheduleEvent["status"], string> = {
  open: "Booking open",
  waitlist: "Waitlist",
  closed: "Closed",
};

const statusClass: Record<ScheduleEvent["status"], string> = {
  open: "bg-accent text-accent-foreground",
  waitlist: "bg-secondary text-secondary-foreground",
  closed: "bg-muted text-muted-foreground",
};

export function ScheduleItem({
  event,
  settings,
  featured = false,
}: {
  event: ScheduleEvent;
  settings: SiteSettings;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-2xl border border-border/70 p-6 sm:flex-row",
        featured &&
          "bg-card shadow-[0_20px_50px_-30px_oklch(0.33_0.06_152_/_0.5)]",
      )}
    >
      {event.image_url ? (
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted ring-1 ring-border/70 sm:w-56 sm:shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image_url}
            alt={event.workshop_title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-heading text-lg font-medium">
            {event.workshop_title}
          </h3>
          <Badge className={cn("rounded-full", statusClass[event.status])}>
            {statusLabel[event.status]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {event.date} · {event.time}
        </p>
        <p className="text-sm text-muted-foreground">{event.location}</p>
        {event.description ? (
          <p className="font-serif text-base text-foreground/75 italic">
            {event.description}
          </p>
        ) : null}
        <p className="text-sm font-medium">
          {event.price_label} · {event.seats_total} seats
        </p>
        <div className="mt-2">
          <BookButton
            settings={settings}
            context={event.workshop_title}
            label={event.status === "closed" ? "Get in touch" : "Book a seat"}
          />
        </div>
      </div>
    </div>
  );
}
