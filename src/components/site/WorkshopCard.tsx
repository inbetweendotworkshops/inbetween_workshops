import type { Workshop } from "@/lib/types";

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <div className="group flex flex-col gap-4">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
        {workshop.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={workshop.image_url}
            alt={workshop.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {workshop.category}
        </p>
        <h3 className="mt-1 font-heading text-lg font-medium">{workshop.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {workshop.description}
        </p>
      </div>
    </div>
  );
}
