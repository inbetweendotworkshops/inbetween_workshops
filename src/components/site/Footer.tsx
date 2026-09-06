import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground">
        <p className="font-heading font-medium text-foreground">
          {settings.logo_text}
        </p>
        <p>{settings.footer_tagline}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          <a
            href={`mailto:${settings.contact_email}`}
            className="transition-colors hover:text-foreground"
          >
            {settings.contact_email}
          </a>
          <span>{settings.address_line}</span>
        </div>
      </div>
    </footer>
  );
}
