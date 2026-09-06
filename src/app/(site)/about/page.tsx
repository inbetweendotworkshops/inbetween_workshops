import { getAboutPage } from "@/lib/queries";
import { StitchDivider } from "@/components/site/StitchDivider";

export default async function AboutPage() {
  const about = await getAboutPage();

  const pillars = [
    { title: about.pillar_1_title, desc: about.pillar_1_desc },
    { title: about.pillar_2_title, desc: about.pillar_2_desc },
    { title: about.pillar_3_title, desc: about.pillar_3_desc },
  ];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-16 sm:py-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-secondary" aria-hidden="true" />
          <p className="text-xs font-medium tracking-[0.2em] text-secondary uppercase">
            About
          </p>
        </div>
        <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          {about.heading}
        </h1>
        <p className="max-w-xl font-serif text-lg text-foreground/75 italic">
          {about.intro_paragraph}
        </p>
      </div>

      {about.image_url ? (
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 -bottom-4 -left-4 -z-10 rounded-[2rem] border border-secondary/40 sm:-top-6 sm:-right-6 sm:-bottom-6 sm:-left-6"
          />
          <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_-30px_oklch(0.33_0.06_152_/_0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={about.image_url}
              alt={about.heading}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      <p className="max-w-2xl text-lg leading-relaxed text-foreground/80 first-letter:float-left first-letter:mr-2 first-letter:font-heading first-letter:text-5xl first-letter:leading-[0.85] first-letter:text-secondary">
        {about.story_paragraph}
      </p>

      <StitchDivider />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {pillars.map((pillar, i) => (
          <div key={pillar.title} className="flex flex-col gap-2">
            <p className="font-serif text-2xl text-secondary italic">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-heading font-medium">{pillar.title}</h3>
            <p className="text-sm text-muted-foreground">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
