import type { SiteSettings } from "@/lib/types";
import { StitchDivider } from "@/components/site/StitchDivider";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-12 text-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-secondary"
          />
          <p className="font-heading font-medium text-foreground">
            {settings.logo_text}
          </p>
        </div>
        <p className="font-serif text-base text-foreground/70 italic">
          {settings.footer_tagline}
        </p>
        <StitchDivider className="my-1" />
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a
            href={`mailto:${settings.contact_email}`}
            className="transition-colors hover:text-foreground"
          >
            {settings.contact_email}
          </a>
          <span aria-hidden="true">·</span>
          <span>{settings.address_line}</span>
        </div>
      </div>
    </footer>
  );
}
