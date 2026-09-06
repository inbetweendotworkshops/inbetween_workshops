import { getAboutPage } from "@/lib/queries";

export default async function AboutPage() {
  const about = await getAboutPage();

  const pillars = [
    { title: about.pillar_1_title, desc: about.pillar_1_desc },
    { title: about.pillar_2_title, desc: about.pillar_2_desc },
    { title: about.pillar_3_title, desc: about.pillar_3_desc },
  ];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-medium tracking-tight">
          {about.heading}
        </h1>
        <p className="max-w-xl text-muted-foreground">
          {about.intro_paragraph}
        </p>
      </div>

      {about.image_url ? (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={about.image_url}
            alt={about.heading}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <p className="max-w-2xl text-base text-muted-foreground">
        {about.story_paragraph}
      </p>

      <div className="grid grid-cols-1 gap-8 border-t border-border/70 pt-10 sm:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="flex flex-col gap-2">
            <h3 className="font-heading font-medium">{pillar.title}</h3>
            <p className="text-sm text-muted-foreground">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
