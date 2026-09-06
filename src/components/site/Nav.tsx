import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

const links = [
  { href: "/", label: "Home" },
  { href: "/workshops", label: "Workshops" },
  { href: "/schedule", label: "Schedule" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

const linkClass =
  "relative py-1 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

export function Nav({ settings }: { settings: SiteSettings }) {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 font-heading text-sm font-medium tracking-wide uppercase"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-secondary transition-transform duration-300 group-hover:scale-150"
          />
          {settings.logo_text}
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Socials
          </a>
        </nav>
      </div>
    </header>
  );
}
