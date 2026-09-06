import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { AdminSection } from "@/lib/admin-sections";

export function EditorBanner({ section }: { section: AdminSection }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-3">
      <p className="text-sm">
        Editing: <span className="font-medium">{section.livePage}</span> →{" "}
        {section.editorLabel}
      </p>
      <Link
        href={section.liveHref}
        target="_blank"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        View live page <ExternalLink className="size-3.5" />
      </Link>
    </div>
  );
}
