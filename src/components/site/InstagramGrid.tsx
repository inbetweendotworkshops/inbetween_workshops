import type { InstagramGalleryItem, SiteSettings } from "@/lib/types";

export function InstagramGrid({
  items,
  settings,
}: {
  items: InstagramGalleryItem[];
  settings: SiteSettings;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.link || settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square overflow-hidden rounded-xl bg-muted"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image_url}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </a>
        ))}
      </div>
      <a
        href={settings.instagram_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        @{settings.instagram_handle} →
      </a>
    </div>
  );
}
