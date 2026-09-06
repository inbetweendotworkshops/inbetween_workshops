import { adminGetHero } from "@/lib/admin-queries";
import { ADMIN_SECTIONS } from "@/lib/admin-sections";
import { EditorBanner } from "@/components/admin/EditorBanner";
import { HeroForm } from "@/components/admin/forms/HeroForm";

export default async function AdminHomePage() {
  const hero = await adminGetHero();
  const section = ADMIN_SECTIONS.find((s) => s.key === "home")!;

  return (
    <div className="flex flex-col gap-6">
      <EditorBanner section={section} />
      <h1 className="text-2xl font-medium">Home page hero</h1>
      <HeroForm initial={hero} />
    </div>
  );
}
