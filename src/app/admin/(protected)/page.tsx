import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Pick a section below. Each one tells you exactly which live page it
          controls — changes go out immediately after you save.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ADMIN_SECTIONS.map((section) => (
          <Card key={section.key}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{section.livePage}</span>
                <Link
                  href={section.liveHref}
                  target="_blank"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-4" />
                </Link>
              </CardTitle>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {section.editorLabel}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
              <Link
                href={section.editorHref}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                Edit this section →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
