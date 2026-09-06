import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

const links = [
  { href: "/", label: "Home" },
  { href: "/workshops", label: "Workshops" },
  { href: "/schedule", label: "Schedule" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

export function Nav({ settings }: { settings: SiteSettings }) {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="font-heading text-sm font-medium tracking-wide uppercase"
        >
          {settings.logo_text}
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Socials
          </a>
        </nav>
      </div>
    </header>
  );
}
