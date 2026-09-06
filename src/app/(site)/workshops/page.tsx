import { getSiteSettings, getWorkshops } from "@/lib/queries";
import { WorkshopCard } from "@/components/site/WorkshopCard";
import { BookButton } from "@/components/site/BookButton";

export default async function WorkshopsPage() {
  const [workshops, settings] = await Promise.all([
    getWorkshops(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-medium tracking-tight">
          Everything we run
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Each workshop is a single sitting of two to three hours. Materials
          included, nothing to bring but yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/70 p-6">
        <p className="text-sm text-muted-foreground">
          Private groups of 8+ available anywhere in Bangalore.
        </p>
        <div>
          <BookButton settings={settings} label="Get in touch" />
        </div>
      </div>
    </div>
  );
}
