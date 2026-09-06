"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-border/70 bg-card px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="px-2">
          <p className="text-sm font-medium">Inbetween Workshops</p>
          <p className="text-xs text-muted-foreground">Admin panel</p>
        </div>
        <nav className="flex flex-col gap-1">
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
              pathname === "/admin" && "bg-muted font-medium",
            )}
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          {ADMIN_SECTIONS.map((section) => (
            <Link
              key={section.key}
              href={section.editorHref}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                pathname?.startsWith(section.editorHref) &&
                  "bg-muted font-medium",
              )}
            >
              <span className="block">{section.livePage}</span>
              <span className="block text-xs text-muted-foreground">
                {section.editorLabel}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <Button variant="outline" onClick={handleLogout} className="gap-2">
        <LogOut className="size-4" />
        Log out
      </Button>
    </aside>
  );
}
