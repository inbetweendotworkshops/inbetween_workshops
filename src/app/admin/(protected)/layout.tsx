import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Admin pages read live data behind an auth check on every request —
// never prerender/cache them, or edits won't show up after a save.
export const dynamic = "force-dynamic";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-8 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
