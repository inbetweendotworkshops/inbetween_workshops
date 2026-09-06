import { getSiteSettings } from "@/lib/queries";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <div className="flex min-h-full flex-col">
      <Nav settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
